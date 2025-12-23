# ANQR - Animated QR Code Generator
# Makefile for build, development, and deployment

.PHONY: all install dev build preview clean lint format help deploy

# Default target
all: install build

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install

# Start development server
dev:
	@echo "🚀 Starting development server..."
	npm run dev

# Build for production
build:
	@echo "🔨 Building for production..."
	npm run build

# Preview production build
preview:
	@echo "👀 Previewing production build..."
	npm run preview

# Serve production build
serve:
	@echo "🌐 Serving production build..."
	npm run serve

# Clean build artifacts and dependencies
clean:
	@echo "🧹 Cleaning..."
	rm -rf dist node_modules .cache

# Clean only build artifacts
clean-dist:
	@echo "🧹 Cleaning dist..."
	rm -rf dist

# Run linter
lint:
	@echo "🔍 Running linter..."
	npm run lint || true

# Format code (if prettier is added)
format:
	@echo "✨ Formatting code..."
	@if command -v prettier > /dev/null; then \
		prettier --write "src/**/*.{js,css,html}"; \
	else \
		echo "Prettier not installed, skipping..."; \
	fi

# Watch for changes and rebuild
watch:
	@echo "👁️ Watching for changes..."
	npm run dev

# Create a release zip for deployment
release: build
	@echo "📦 Creating release package..."
	@mkdir -p releases
	@cd dist && zip -r ../releases/anqr-$(shell date +%Y%m%d-%H%M%S).zip .
	@echo "✅ Release package created in releases/"

# Deploy to GitHub Pages (if gh-pages is set up)
deploy-gh: build
	@echo "🚀 Deploying to GitHub Pages..."
	@if command -v gh > /dev/null; then \
		gh pages deploy dist; \
	else \
		echo "GitHub CLI not installed. Install with: brew install gh"; \
	fi

# Deploy to Netlify (if netlify-cli is installed)
deploy-netlify: build
	@echo "🚀 Deploying to Netlify..."
	@if command -v netlify > /dev/null; then \
		netlify deploy --prod --dir=dist; \
	else \
		echo "Netlify CLI not installed. Install with: npm install -g netlify-cli"; \
	fi

# Deploy to Vercel (if vercel-cli is installed)
deploy-vercel: build
	@echo "🚀 Deploying to Vercel..."
	@if command -v vercel > /dev/null; then \
		vercel --prod dist; \
	else \
		echo "Vercel CLI not installed. Install with: npm install -g vercel"; \
	fi

# Deploy to Surge.sh
deploy-surge: build
	@echo "🚀 Deploying to Surge..."
	@if command -v surge > /dev/null; then \
		surge dist; \
	else \
		echo "Surge CLI not installed. Install with: npm install -g surge"; \
	fi

# Update qrcode.js library from source
update-qrcode:
	@echo "📥 Updating qrcode.js library..."
	curl -L https://raw.githubusercontent.com/kazuhikoarase/qrcode-generator/master/js/dist/qrcode.js -o src/lib/qrcode.js

# Run tests (placeholder for future tests)
test:
	@echo "🧪 Running tests..."
	@echo "No tests configured yet."

# Check for outdated dependencies
outdated:
	@echo "📋 Checking for outdated dependencies..."
	npm outdated || true

# Update dependencies
update:
	@echo "⬆️ Updating dependencies..."
	npm update

# Security audit
audit:
	@echo "🔒 Running security audit..."
	npm audit || true

# Show project info
info:
	@echo "ℹ️ ANQR - Animated QR Code Generator"
	@echo ""
	@echo "Project Structure:"
	@echo "  src/           - Source files"
	@echo "  src/lib/       - Third-party libraries"
	@echo "  src/modules/   - Application modules"
	@echo "  src/styles/    - CSS styles"
	@echo "  dist/          - Production build output"
	@echo ""
	@echo "Available commands:"
	@echo "  make install   - Install dependencies"
	@echo "  make dev       - Start development server"
	@echo "  make build     - Build for production"
	@echo "  make preview   - Preview production build"
	@echo "  make clean     - Remove build artifacts"
	@echo "  make release   - Create a deployment zip"
	@echo "  make deploy-*  - Deploy to various platforms"

# Check AdSense readiness
adsense-check: build
	@echo "🔍 Checking AdSense Readiness..."
	@echo ""
	@echo "=== FILE CHECKS ==="
	@echo -n "✓ robots.txt: "; test -f dist/robots.txt && echo "EXISTS" || echo "MISSING ❌"
	@echo -n "✓ sitemap.xml: "; test -f dist/sitemap.xml && echo "EXISTS" || echo "MISSING ❌"
	@echo -n "✓ index.html: "; test -f dist/index.html && echo "EXISTS" || echo "MISSING ❌"
	@echo ""
	@echo "=== META TAG CHECKS ==="
	@echo -n "✓ Description meta: "; grep -q 'meta name="description"' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo -n "✓ Canonical URL: "; grep -q 'rel="canonical"' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo -n "✓ Open Graph tags: "; grep -q 'property="og:' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo -n "✓ Twitter cards: "; grep -q 'name="twitter:' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo -n "✓ Robots meta: "; grep -q 'name="robots"' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo ""
	@echo "=== ADSENSE CHECKS ==="
	@echo -n "✓ AdSense script: "; grep -q 'pagead2.googlesyndication.com' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo -n "✓ Ad slots defined: "; grep -q 'data-ad-slot' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo ""
	@echo "=== REQUIRED PAGES ==="
	@echo -n "✓ Privacy Policy: "; grep -q 'id="page-privacy"' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo -n "✓ Terms of Service: "; grep -q 'id="page-terms"' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo -n "✓ About page: "; grep -q 'id="page-about"' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo -n "✓ Contact page: "; grep -q 'id="page-contact"' dist/index.html && echo "FOUND" || echo "MISSING ❌"
	@echo ""
	@echo "=== NETLIFY CONFIG ==="
	@echo -n "✓ netlify.toml: "; test -f netlify.toml && echo "EXISTS" || echo "MISSING ❌"
	@echo ""
	@echo "=== SUMMARY ==="
	@MISSING=0; \
	test -f dist/robots.txt || MISSING=$$((MISSING+1)); \
	test -f dist/sitemap.xml || MISSING=$$((MISSING+1)); \
	grep -q 'property="og:' dist/index.html || MISSING=$$((MISSING+1)); \
	grep -q 'id="page-privacy"' dist/index.html || MISSING=$$((MISSING+1)); \
	grep -q 'id="page-terms"' dist/index.html || MISSING=$$((MISSING+1)); \
	grep -q 'pagead2.googlesyndication.com' dist/index.html || MISSING=$$((MISSING+1)); \
	if [ $$MISSING -eq 0 ]; then \
		echo "✅ All AdSense requirements met! Ready for submission."; \
	else \
		echo "⚠️  $$MISSING requirement(s) missing. Review above."; \
	fi

# Help
help:
	@echo "ANQR Makefile Commands:"
	@echo ""
	@echo "  make              - Install dependencies and build"
	@echo "  make install      - Install npm dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make preview      - Preview production build"
	@echo "  make serve        - Serve production build on port 3000"
	@echo "  make clean        - Remove dist/ and node_modules/"
	@echo "  make clean-dist   - Remove only dist/"
	@echo "  make lint         - Run ESLint"
	@echo "  make format       - Format code with Prettier"
	@echo "  make release      - Create deployment zip in releases/"
	@echo "  make deploy-gh    - Deploy to GitHub Pages"
	@echo "  make deploy-netlify - Deploy to Netlify"
	@echo "  make deploy-vercel  - Deploy to Vercel"
	@echo "  make deploy-surge   - Deploy to Surge.sh"
	@echo "  make update-qrcode  - Update qrcode.js from source"
	@echo "  make test         - Run tests"
	@echo "  make outdated     - Check for outdated deps"
	@echo "  make update       - Update dependencies"
	@echo "  make audit        - Run security audit"
	@echo "  make info         - Show project info"
	@echo "  make adsense-check  - Check AdSense readiness"
	@echo "  make help         - Show this help"
