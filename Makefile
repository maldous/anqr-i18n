.PHONY: dev build gallery gallery\:gifs deploy

export ENV := PROD
export VITE_ADSENSE_ENABLED := true
export VITE_ADSENSE_SLOT_LEFT_SKYSCRAPER := 1234567890
export VITE_ADSENSE_SLOT_RIGHT_SKYSCRAPER := 1234567891
export VITE_ADSENSE_SLOT_SIDEBAR_BOTTOM := 1234567892
export VITE_ADSENSE_SLOT_HEADER_MOBILE := 1234567893
export VITE_ADSENSE_SLOT_MOBILE_ABOVE_QR := 1234567894
export VITE_ADSENSE_SLOT_MOBILE_BELOW_QR := 1234567895
export VITE_ADSENSE_SLOT_GALLERY_LEFT := 1234567896
export VITE_ADSENSE_SLOT_GALLERY_RIGHT := 1234567897
export VITE_ADSENSE_SLOT_STATIC_BOTTOM := 1234567898

install:
	npm install

build:
	npm run build

dev:
	npm run dev

gallery:
	node scripts/generate-gallery.mjs

deploy:
	netlify deploy --prod --site anqr.link --dir=dist
