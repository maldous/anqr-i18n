# ANQR - Makefile (Netlify-only)
# Notes:
# - Target names use underscores (no hyphens)
# - Deploy uses Netlify CLI and deploys ./dist

SHELL := /bin/bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c

PROJECT      := anqr
DIST_DIR     := dist
RELEASES_DIR := releases

.DEFAULT_GOAL := help
.PHONY: help all doctor install dev build preview serve clean clean_dist lint format test check outdated update audit update_qrcode adsense_check info release deploy netlify_status netlify_open commit push ci report report_clean zip snapshot

# ----------------------------
# Helpers
# ----------------------------
define require_cmd
	@command -v $(1) >/dev/null 2>&1 || { echo "Missing required command: $(1)"; exit 1; }
endef

define require_file
	@test -f $(1) || { echo "Missing required file: $(1)"; exit 1; }
endef

define require_dir
	@test -d $(1) || { echo "Missing required directory: $(1)"; exit 1; }
endef

node_check = node -e "const v=process.versions.node.split('.').map(Number); if(v[0] < 18){ console.error('Node >= 18 is required. Found: ' + process.versions.node); process.exit(1);} "

# ----------------------------
# Core
# ----------------------------
all: install build

doctor:
	$(call require_cmd,node)
	$(call require_cmd,npm)
	@$(node_check)
	$(call require_file,package.json)
	$(call require_file,netlify.toml)
	@# fail fast if placeholders accidentally got committed
	@if grep -R --line-number --fixed-strings "..." netlify.toml .gitignore >/dev/null 2>&1; then \
		echo "Found placeholder '...' in config files. Remove it before continuing."; \
		grep -R --line-number --fixed-strings "..." netlify.toml .gitignore || true; \
		exit 1; \
	fi
	@echo "doctor: ok"

install: doctor
	@echo "install: npm install"
	npm install

dev: install
	@echo "dev: vite"
	npm run dev

build: install
	@echo "build: vite build"
	npm run build

preview: build
	@echo "preview: vite preview"
	npm run preview -- --host

serve: build
	@echo "serve: preview on :3000"
	npm run serve -- --host

# ----------------------------
# Hygiene
# ----------------------------
clean:
	@echo "clean: removing node_modules, dist, releases"
	rm -rf node_modules "$(DIST_DIR)" "$(RELEASES_DIR)" \
		*.swp *.swo *~ .DS_Store

clean_dist:
	@echo "clean_dist: removing dist"
	rm -rf "$(DIST_DIR)"

lint: install
	@echo "lint: eslint"
	npm run lint

format: install
	@echo "format: prettier --write"
	npm run format

test: install
	@echo "test: node --test"
	npm run test

check: lint test build
	@echo "check: ok"

# ----------------------------
# Dependency maintenance
# ----------------------------

# ----------------------------
# Reports (exhaustive static tooling)
# ----------------------------
REPORTS_DIR ?= reports

report_clean:
	@echo "report_clean: removing $(REPORTS_DIR)"
	rm -rf "$(REPORTS_DIR)"

report: doctor
	@echo "report: running exhaustive analysis -> $(REPORTS_DIR)/"
	REPORTS_DIR="$(REPORTS_DIR)" npm run report

outdated: install
	@echo "outdated: npm outdated"
	@npm outdated || true

update: install
	@echo "update: npm update"
	npm update

audit: install
	@echo "audit: npm audit"
	@npm audit || true


# ----------------------------
# Library helpers
# ----------------------------
update_qrcode: doctor
	@echo "update_qrcode: syncing src/lib/qrcode.js <-> public/qrcode.js"
	$(call require_file,src/lib/qrcode.js)
	$(call require_file,public/qrcode.js)
	@# canonical copy lives in src/lib
	cp -f src/lib/qrcode.js public/qrcode.js
	@echo "update_qrcode: done"

adsense_check: doctor
	@echo "adsense_check: basic Netlify/AdSense readiness checks"
	@missing=0; \
	if ! test -f public/ads.txt; then echo "missing: public/ads.txt"; missing=1; fi; \
	if ! test -f public/robots.txt; then echo "missing: public/robots.txt"; missing=1; fi; \
	if ! test -f public/sitemap.xml; then echo "missing: public/sitemap.xml"; missing=1; fi; \
	if ! grep -q "pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" index.html 2>/dev/null; then \
		echo "note: index.html does not appear to include the AdSense loader script"; \
	fi; \
	if test "$$missing" -ne 0; then exit 1; fi; \
	echo "adsense_check: ok"

# ----------------------------
# Info / Release
# ----------------------------
info: doctor
	@echo "project: $(PROJECT)"
	@echo "node: $$(node -v)"
	@echo "npm:  $$(npm -v)"
	@echo "git:  $$(command -v git >/dev/null 2>&1 && git --version || echo 'not installed')"
	@echo "netlify: $$(command -v netlify >/dev/null 2>&1 && netlify --version || echo 'not installed')"

release: build
	$(call require_cmd,zip)
	mkdir -p "$(RELEASES_DIR)"
	@ts=$$(date +%Y%m%d-%H%M%S); \
	out="$(RELEASES_DIR)/$(PROJECT)-$${ts}.zip"; \
	echo "release: $$out"; \
	zip -qr "$$out" "$(DIST_DIR)" netlify.toml public || true

# ----------------------------
# Netlify deploy (single path)
# ----------------------------
deploy: build
	$(call require_cmd,netlify)
	@site=""; \
	if test -n "$${NETLIFY_SITE_ID:-}"; then site="$${NETLIFY_SITE_ID}"; fi; \
	if test -z "$$site" && test -f .netlify/state.json; then \
		site="$$(node -pe 'require("./.netlify/state.json").siteId')";
	fi; \
	if test -z "$$site"; then \
		echo "deploy: missing site id. Link the site with 'netlify init' (creates .netlify/state.json) or set NETLIFY_SITE_ID."; \
		exit 1; \
	fi; \
	echo "deploy: netlify deploy --prod --site $$site --dir=$(DIST_DIR)"; \
	netlify deploy --prod --site "$$site" --dir="$(DIST_DIR)"

netlify_status:
	$(call require_cmd,netlify)
	netlify status || true

netlify_open:
	$(call require_cmd,netlify)
	netlify open:site || true

# ----------------------------
# Git helpers
# ----------------------------
commit:
	$(call require_cmd,git)
	@if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then \
		echo "commit: not a git repository"; \
		exit 1; \
	fi
	@if test -z "$$(git status --porcelain)"; then \
		echo "commit: nothing to commit"; \
		exit 0; \
	fi
	@msg="$$(date +%s)"; \
	echo "commit: $$msg"; \
	git add -A; \
	git commit -m "$$msg"; \
	git push

push:
	$(call require_cmd,git)
	git push

ci: doctor
	@echo "ci: install + lint + test + build"
	npm install
	npm run lint
	npm run test
	npm run build

# ----------------------------
# Shareable zip (project snapshot)
# ----------------------------
# ----------------------------
# Zip artifacts
# ----------------------------
snapshot: clean
	$(call require_cmd,zip)
	@out="../$(PROJECT).zip"; \
	rm -f "$$out"; \
	echo "snapshot: $$out"; \
	zip -qr "$$out" . \
		-x ".git/*" \
		-x "*.swp" -x "*.swo" -x "*~" -x ".DS_Store" \
		-x "reports/*"

zip: report
	$(call require_cmd,zip)
	@mkdir -p "$(RELEASES_DIR)"; \
	ts="$$(date +%Y%m%d-%H%M%S)"; \
	out="$(RELEASES_DIR)/$(PROJECT)-reports-$$ts.zip"; \
	rm -f "$$out"; \
	echo "zip: $$out"; \
	zip -qr "$$out" \
		reports \
		Makefile package.json package-lock.json \
		eslint.config.js vite.config.js tsconfig.json \
		knip.json .dependency-cruiser.js .unimportedrc.json \
		jsdoc.json typedoc.json api-extractor.json sonar-project.properties \
		scripts/report/run.sh \
		netlify.toml README.md .gitignore \
		-x "node_modules/*" -x ".scannerwork/*" -x ".sonar/*" -x "dist/*" -x ".git/*" -x ".netlify/*" -x "releases/*"

# ----------------------------
# Help
# ----------------------------
help:
	@echo "ANQR Make targets"
	@echo ""
	@echo "Core:"
	@echo "  make doctor          Verify tools/config"
	@echo "  make install         Install deps"
	@echo "  make dev             Run Vite dev server"
	@echo "  make build           Build production dist/"
	@echo "  make preview         Preview build (host=0.0.0.0)"
	@echo "  make serve           Preview build (host=0.0.0.0)"
	@echo ""
	@echo "Quality:"
	@echo "  make lint            ESLint"
	@echo "  make format          Prettier write"
	@echo "  make test            Run unit tests (node --test)"
	@echo "  make check           Lint + test + build"
	@echo ""
	@echo "Maintenance:"
	@echo "  make outdated        npm outdated (non-fatal)"
	@echo "  make update          npm update"
	@echo "  make audit           npm audit (non-fatal)"
	@echo ""
	@echo "Release/Deploy:"
	@echo "  make release         Zip dist into releases/"
	@echo "  make deploy          Deploy to Netlify (requires netlify CLI + linked site)"
	@echo "  make netlify_status  Show Netlify site status"
	@echo "  make netlify_open    Open Netlify site in browser"
	@echo ""
	@echo "Git:"
	@echo "  make commit          git add/commit/push (message = epoch seconds)"
	@echo "  make push            git push"
	@echo ""
	@echo "Project:"
	@echo "  make clean           Remove node_modules, dist, releases"
	@echo "  make clean_dist      Remove dist only"
	@echo "  make zip             Run make report, then zip reports + key files into releases/"
	@echo "  make snapshot        Create ../anqr.zip snapshot (excludes .git, node_modules, dist, reports)"
	@echo "  make update_qrcode   Sync src/lib/qrcode.js -> public/qrcode.js"
	@echo "  make adsense_check   Check required public files for AdSense"
	@echo "  make info            Print versions"
	@echo "  make ci              Run install + lint + test + build"