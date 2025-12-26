.PHONY: dev build gallery

dev:
	npm run dev

build:
	npm run build

gallery:
	@echo "Generating gallery images..."
	@echo "Note: Dev server must be running (npm run dev)"
	@node scripts/generate-gallery.mjs
