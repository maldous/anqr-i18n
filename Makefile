.PHONY: dev build gallery deploy

dev:
	npm run dev

build:
	npm run build

gallery:
	node scripts/generate-gallery.mjs

deploy:
	netlify deploy --prod --site anqr.link --dir=dist
