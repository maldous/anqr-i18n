#!/usr/bin/env bash
# Exhaustive static analysis / report runner.
# Goal: generate everything possible into ./reports without blocking on failures.
set -u

# reporting profile: "curated" (default) or "full"
REPORT_PROFILE="${REPORT_PROFILE:-curated}"
is_full() { [ "$REPORT_PROFILE" = "full" ] || [ "${REPORTS_FULL:-0}" = "1" ]; }

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

REPORTS_DIR="${REPORTS_DIR:-reports}"
TSV="$REPORTS_DIR/summary.tsv"

mkdir -p "$REPORTS_DIR"/{logs,eslint,deps,arch,complexity,metrics,security,bundle,licenses,docs,api,sonar}

rm -f "$TSV"
echo -e "step\texit_code\tseconds\tlog" >"$TSV"

run_step() {
	local name="$1"
	shift
	local cmd="$*"
	local log="$REPORTS_DIR/logs/${name}.log"
	local start end dur code

	echo "==> ${name}" | tee "$log"
	echo "\$ $cmd" >>"$log"
	start="$(date +%s)"

	# Never abort the whole run
	set +e
	bash -lc "$cmd" >>"$log" 2>&1
	code="$?"
	set -e 2>/dev/null || true

	end="$(date +%s)"
	dur="$((end - start))"

	echo -e "${name}\t${code}\t${dur}\t${log}" >>"$TSV"
	echo "exit=${code} duration=${dur}s log=${log}" | tee -a "$log"
	echo "" >>"$log"
	return 0
}

# ----------------------------
# Static / semantic / type analysis
# ----------------------------
run_step "prettier_check" "npx prettier --check ."
run_step "tsc_noemit" "npx tsc --noEmit -p tsconfig.json --pretty false"
run_step "eslint_json" "npx eslint \"src/**/*.{js,ts,mjs,cjs}\" -f json --output-file \"$REPORTS_DIR/eslint/eslint.json\""
if is_full; then
	run_step "eslint_stylish" "npx eslint \"src/**/*.{js,ts,mjs,cjs}\" -f stylish > \"$REPORTS_DIR/eslint/eslint.txt\""
fi
run_step "eslint_print_config" "npx eslint --print-config src/main.js > \"$REPORTS_DIR/eslint/print-config.json\""

# ----------------------------
# Dependency / unused / graph analysis
# ----------------------------
run_step "knip" "npx knip --config knip.json --reporter json --no-exit-code > \"$REPORTS_DIR/deps/knip.json\""
run_step "depcheck" "npx depcheck --json --ignore-dirs=dist,reports,releases,.netlify,.scannerwork,node_modules --ignores \"@microsoft/api-extractor,cloc,danger,depcheck,dependency-cruiser,jsdoc,knip,license-checker,madge,retire,rollup-plugin-visualizer,snyk,sonarqube-scanner,source-map-explorer,ts-prune,typedoc,unimported\" > \"$REPORTS_DIR/deps/depcheck.json\" || true"
run_step "madge_json" "npx madge src --json > \"$REPORTS_DIR/deps/madge.json\""
run_step "madge_circular" "npx madge src --circular --json > \"$REPORTS_DIR/deps/madge-circular.json\""
if is_full; then
	run_step "madge_image" "command -v dot >/dev/null 2>&1 && npx madge src --image \"$REPORTS_DIR/deps/madge.svg\" || echo 'dot (graphviz) not installed; skipping image'"
fi
run_step "dependency_cruiser_json" "rm -f \"$REPORTS_DIR/arch/depcruise.json\"; npx depcruise --config .dependency-cruiser.cjs src --output-type json > \"$REPORTS_DIR/arch/depcruise.json\"; test -s \"$REPORTS_DIR/arch/depcruise.json\""
if is_full; then
	run_step "dependency_cruiser_dot" "npx depcruise --config .dependency-cruiser.cjs src --output-type dot > \"$REPORTS_DIR/arch/depcruise.dot\""
fi
if is_full; then
	run_step "dependency_cruiser_svg" "command -v dot >/dev/null 2>&1 && dot -Tsvg \"$REPORTS_DIR/arch/depcruise.dot\" -o \"$REPORTS_DIR/arch/depcruise.svg\" || echo 'dot (graphviz) not installed; skipping svg'"
fi

run_step "ts_prune" "npx ts-prune -p tsconfig.json > \"$REPORTS_DIR/deps/ts-prune.txt\""
run_step "unimported" "npx unimported > \"$REPORTS_DIR/deps/unimported.txt\" || true"

# ----------------------------
# Architecture / complexity / meta
# ----------------------------
if is_full; then
	run_step "plato" "npx plato -r -d \"$REPORTS_DIR/complexity/plato\" src"
fi
run_step "cloc_json" "npx cloc src --json --out \"$REPORTS_DIR/metrics/cloc.json\""
if is_full; then
	run_step "cloc_text" "npx cloc src > \"$REPORTS_DIR/metrics/cloc.txt\""
fi

# ----------------------------
# Security analysis
# ----------------------------
run_step "npm_audit_json" "npm audit --json --audit-level=critical > \"$REPORTS_DIR/security/npm-audit.json\""
run_step "retire_js" "npx retire --outputformat json --outputpath \"$REPORTS_DIR/security/retire.json\" --ignore \"node_modules,dist,reports,releases,.netlify,.scannerwork\" --exitwith 0"
run_step "snyk_test_json" "npx snyk test --json > \"$REPORTS_DIR/security/snyk.json\""
run_step "snyk_test_sarif" "npx snyk test --sarif > \"$REPORTS_DIR/security/snyk.sarif\""
run_step "snyk_code_json" "npx snyk code test --json > \"$REPORTS_DIR/security/snyk-code.json\""
run_step "osv_scanner" "command -v osv-scanner >/dev/null 2>&1 && osv-scanner --format json --output \"$REPORTS_DIR/security/osv.json\" . || echo 'osv-scanner not installed; skipping'"

# ----------------------------
# Licenses / compliance (lightweight)
# ----------------------------
run_step "license_checker" "npx license-checker --json > \"$REPORTS_DIR/licenses/licenses.json\""

# ----------------------------
# Bundle / build analysis
# ----------------------------
if is_full; then
	run_step "vite_build_analyze" "ANALYZE=1 npx vite build"
fi
if is_full; then
	run_step "source_map_explorer" "ls dist/assets/*.js >/dev/null 2>&1 && npx source-map-explorer \"dist/assets/*.js\" --html \"$REPORTS_DIR/bundle/source-map-explorer.html\" || echo 'No dist/assets/*.js (build failed?); skipping'"
fi

# ----------------------------
# Docs / API surface
# ----------------------------
if is_full; then
	run_step "jsdoc" "npx jsdoc -c jsdoc.json"
fi
if is_full; then
	run_step "typedoc" "npx typedoc --options typedoc.json"
fi
if is_full; then
	run_step "api_extractor" "npx api-extractor run --local --config api-extractor.json"
fi

# ----------------------------
# SonarQube (local) - optional
# ----------------------------
run_step "sonarqube_scanner" "if [ -n \"${SONARQUBE_TOKEN:-}\" ]; then SONAR_HOST_URL=\"${SONAR_HOST_URL:-http://localhost:9000}\"; SONAR_TOKEN=\"$SONARQUBE_TOKEN\" npx sonarqube-scanner -Dsonar.host.url=\"$SONAR_HOST_URL\"; if [ -f .scannerwork/report-task.txt ]; then cp .scannerwork/report-task.txt \"$REPORTS_DIR/sonar/report-task.txt\"; fi; if [ -f \"$REPORTS_DIR/sonar/report-task.txt\" ]; then sed -n 's/^dashboardUrl=//p' \"$REPORTS_DIR/sonar/report-task.txt\" > \"$REPORTS_DIR/sonar/dashboard-url.txt\" || true; fi; else echo \"SONARQUBE_TOKEN not set; skipping\"; fi"

# ----------------------------
# SonarQube exports (overall report)
# ----------------------------
run_step "sonarqube_export" "if [ -n \"${SONARQUBE_TOKEN:-}\" ]; then SONAR_HOST_URL=\"${SONAR_HOST_URL:-http://localhost:9000}\" SONARQUBE_TOKEN=\"$SONARQUBE_TOKEN\" REPORTS_DIR=\"$REPORTS_DIR\" ./scripts/sonar-export.sh; else echo \"SONARQUBE_TOKEN not set; skipping sonar export\"; fi"

# ----------------------------
# Summary (tsv -> json + human text)
# ----------------------------
node - <<'NODE'
import fs from "node:fs";

const tsv = fs.readFileSync(`${process.env.REPORTS_DIR || "reports"}/summary.tsv`, "utf8").trim().split("\n").slice(1);
const rows = tsv.filter(Boolean).map((line) => {
  const [step, exit_code, seconds, log] = line.split("\t");
  return { step, exit_code: Number(exit_code), seconds: Number(seconds), log };
});
fs.writeFileSync(`${process.env.REPORTS_DIR || "reports"}/summary.json`, JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2) + "\n");

const worst = [...rows].sort((a,b) => b.exit_code - a.exit_code || b.seconds - a.seconds).slice(0, 10);
let out = [];
out.push("ANQR report summary");
out.push("");
out.push(`Total steps: ${rows.length}`);
out.push(`Failures (exit_code!=0): ${rows.filter(r => r.exit_code !== 0).length}`);
out.push("");
out.push("Worst offenders (by exit code / duration):");
for (const r of worst) out.push(`- ${r.step}: exit=${r.exit_code} time=${r.seconds}s log=${r.log}`);
out.push("");
fs.writeFileSync(`${process.env.REPORTS_DIR || "reports"}/summary.txt`, out.join("\n") + "\n");
NODE

echo ""
echo "Done. See:"
echo "  $REPORTS_DIR/summary.txt"
echo "  $REPORTS_DIR/summary.json"
