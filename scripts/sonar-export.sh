#!/usr/bin/env bash
set -e
SONAR_URL=${SONAR_HOST_URL:-http://localhost:9000}
PROJECT=anqr

curl -s -u "$SONARQUBE_TOKEN:" \
	"$SONAR_URL/api/measures/component?component=$PROJECT&metricKeys=bugs,vulnerabilities,code_smells,security_hotspots,coverage,duplicated_lines_density,ncloc,complexity,cognitive_complexity" \
	>reports/sonar/measures.json

curl -s -u "$SONARQUBE_TOKEN:" \
	"$SONAR_URL/api/issues/search?componentKeys=$PROJECT&ps=500" \
	>reports/sonar/issues.json
