.PHONY: dev build gallery gallery\:gif deploy android android\:init android\:sync android\:build android\:release android\:open install clean

# ============================================
# Environment variables
# ============================================
export ENV := PROD

# ============================================
# AdSense Configuration (for Web - anqr.link)
# ============================================
# Publisher ID: ca-pub-2270701384951162 (from ads.txt)
# 
# Create ad units at: https://www.google.com/adsense
#   -> Ads -> By ad unit -> Display ads -> Create new
#   After creating, copy the numeric slot ID to the variable below
#
export VITE_ADSENSE_ENABLED := true
export VITE_ADSENSE_PUBLISHER_ID := ca-pub-2270701384951162

# HIGH PRIORITY - Main app ads
export VITE_ADSENSE_SLOT_LEFT_SKYSCRAPER := 7394019600
export VITE_ADSENSE_SLOT_RIGHT_SKYSCRAPER := 2450289467
export VITE_ADSENSE_SLOT_PREVIEW_MOBILE_TOP := 6080937938
export VITE_ADSENSE_SLOT_PREVIEW_MOBILE_BOTTOM := 1137207795
export VITE_ADSENSE_SLOT_SIDEBAR_BOTTOM := 3247547575

# MEDIUM PRIORITY - Gallery page ads
export VITE_ADSENSE_SLOT_GALLERY_LEFT := 2684618407
export VITE_ADSENSE_SLOT_GALLERY_RIGHT := 3454774598
export VITE_ADSENSE_SLOT_GALLERY_TOP := 9058455062
export VITE_ADSENSE_SLOT_GALLERY_BOTTOM := 4260589809

# LOWER PRIORITY - Static page ads
export VITE_ADSENSE_SLOT_STATIC_LEFT := 1934465907
export VITE_ADSENSE_SLOT_STATIC_RIGHT := 9997606994
export VITE_ADSENSE_SLOT_DOCS_TOP := 6006391093
export VITE_ADSENSE_SLOT_DOCS_BOTTOM := 4693309421
export VITE_ADSENSE_SLOT_ABOUT_TOP := 8437113318
export VITE_ADSENSE_SLOT_ABOUT_BOTTOM := 2067146087
export VITE_ADSENSE_SLOT_PRIVACY_TOP := 9754064417
export VITE_ADSENSE_SLOT_PRIVACY_BOTTOM := 8440982741
export VITE_ADSENSE_SLOT_TERMS_TOP := 5810949978
export VITE_ADSENSE_SLOT_TERMS_BOTTOM := 5814819407
export VITE_ADSENSE_SLOT_CONTACT_TOP := 4497868307
export VITE_ADSENSE_SLOT_CONTACT_BOTTOM := 9562492724


# Gallery section divider ads (between gallery sections)
export VITE_ADSENSE_SLOT_GALLERY_AFTER_PLAIN := 5862086716
export VITE_ADSENSE_SLOT_GALLERY_AFTER_CONTENT_TYPES := 2993214945
export VITE_ADSENSE_SLOT_GALLERY_AFTER_STYLES := 6193275118
export VITE_ADSENSE_SLOT_GALLERY_AFTER_COLORS := 2254030108
export VITE_ADSENSE_SLOT_GALLERY_AFTER_IMAGE_OVERLAY := 3432198644
export VITE_ADSENSE_SLOT_GALLERY_AFTER_ANIMATION_OVERLAY := 6001703423
export VITE_ADSENSE_SLOT_GALLERY_AFTER_BLEND_MODES := 5382099781
export VITE_ADSENSE_SLOT_GALLERY_AFTER_COLOR_MODES := 2062458418
export VITE_ADSENSE_SLOT_GALLERY_AFTER_PREPROCESSING := 8436295070
export VITE_ADSENSE_SLOT_GALLERY_AFTER_ENCODING := 4497050062
export VITE_ADSENSE_SLOT_GALLERY_AFTER_DITHERING := 9557805050

# ============================================
# AdMob Configuration (for native Android/iOS apps)
# ============================================
# App ID: ca-app-pub-2270701384951162~3067761782
# Ad units: https://admob.google.com -> Apps -> ANQR -> Ad units
#
# Banner Ads
export VITE_ADMOB_BANNER_BOTTOM := ca-app-pub-2270701384951162/3063892358
export VITE_ADMOB_BANNER_TOP := ca-app-pub-2270701384951162/6312694619
#
# Interstitial Ads
export VITE_ADMOB_INTERSTITIAL_EXPORT := ca-app-pub-2270701384951162/4365188125
export VITE_ADMOB_INTERSTITIAL_GALLERY := ca-app-pub-2270701384951162/5434727214
export VITE_ADMOB_INTERSTITIAL_GENERATION := ca-app-pub-2270701384951162/7051061212
#
# Rewarded Video Ads
export VITE_ADMOB_REWARDED_PREMIUM := ca-app-pub-2270701384951162/8325432672
export VITE_ADMOB_REWARDED_EXPORT_HD := ca-app-pub-2270701384951162/4911983037
#
# Set to 'true' to show test ads while waiting for approval, 'false' for production
export VITE_ADMOB_TESTING := false

# Android SDK path (adjust for your system)
export ANDROID_HOME ?= $(HOME)/Android/Sdk
export PATH := $(ANDROID_HOME)/tools:$(ANDROID_HOME)/platform-tools:$(PATH)

# ============================================
# Web Development
# ============================================

install:
	npm install

dev:
	npm run dev

build:
	npm run build

clean:
	rm -rf dist node_modules android/app/build

# ============================================
# PWA Icons Generation
# ============================================

icons:
	node scripts/generate-pwa-icons.mjs

icons\:android:
	node scripts/generate-android-icons.mjs

# ============================================
# Gallery Generation
# ============================================

gallery:
	node scripts/generate-gallery.mjs

gallery\:gif:
	node scripts/generate-gallery.mjs --gif

# ============================================
# Deployment
# ============================================

deploy:
	netlify deploy --prod --site anqr.link --dir=dist

# ============================================
# Android App (Capacitor)
# ============================================

# Initialize Android platform (run once)
android\:init:
	npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/splash-screen
	npx cap add android
	@echo "Android platform initialized. Run 'make android:sync' after building."

# Sync web assets to Android project
android\:sync:
	CAPACITOR_PLATFORM=android npm run build
	# Remove pre-compressed files that cause Android asset merger conflicts
	find dist -name '*.gz' -delete 2>/dev/null || true
	find dist -name '*.br' -delete 2>/dev/null || true
	npx cap sync android

# Open in Android Studio for development
android\:open:
	npx cap open android

# Build debug APK
android\:build:
	CAPACITOR_PLATFORM=android npm run build
	# Remove pre-compressed files that cause Android asset merger conflicts
	find dist -name '*.gz' -delete 2>/dev/null || true
	find dist -name '*.br' -delete 2>/dev/null || true
	# Remove gallery folder to reduce APK size (gallery is web-only feature)
	rm -rf dist/gallery 2>/dev/null || true
	# Remove source maps if any
	find dist -name '*.map' -delete 2>/dev/null || true
	# Remove large demo files not needed in mobile app (gallery loads from anqr.link)
	rm -f dist/king.gif dist/tsunami.jpg 2>/dev/null || true
	npx cap sync android
	cd android && ./gradlew assembleDebug
	@echo "Debug APK: android/app/build/outputs/apk/debug/app-debug.apk"

# Build release AAB for Play Store
android\:release:
	CAPACITOR_PLATFORM=android npm run build
	# Remove pre-compressed files that cause Android asset merger conflicts
	find dist -name '*.gz' -delete 2>/dev/null || true
	find dist -name '*.br' -delete 2>/dev/null || true
	# Remove gallery folder to reduce APK size (gallery is web-only feature)
	rm -rf dist/gallery 2>/dev/null || true
	# Remove source maps if any
	find dist -name '*.map' -delete 2>/dev/null || true
	# Remove large demo files not needed in mobile app (gallery loads from anqr.link)
	rm -f dist/king.gif dist/tsunami.jpg 2>/dev/null || true
	npx cap sync android
	cd android && ./gradlew bundleRelease
	@echo "Release AAB: android/app/build/outputs/bundle/release/app-release.aab"

# Run on connected device or emulator
android\:run:
	CAPACITOR_PLATFORM=android npm run build
	# Remove pre-compressed files that cause Android asset merger conflicts
	find dist -name '*.gz' -delete 2>/dev/null || true
	find dist -name '*.br' -delete 2>/dev/null || true
	npx cap sync android
	npx cap run android

# Generate release keystore (run once, keep safe!)
android\:keystore:
	@echo "Generating release keystore..."
	keytool -genkey -v -keystore android/app/release-key.keystore -alias anqr -keyalg RSA -keysize 2048 -validity 10000
	@echo "Keystore generated at android/app/release-key.keystore"
	@echo "IMPORTANT: Back up this file and remember your passwords!"

# Bump version code and version name
android\:bump:
	@echo "Bumping Android version..."
	@CURRENT_CODE=$$(grep -oP 'versionCode \K[0-9]+' android/app/build.gradle); \
	NEW_CODE=$$((CURRENT_CODE + 1)); \
	CURRENT_NAME=$$(grep -oP 'versionName "\K[^"]+' android/app/build.gradle); \
	NEW_NAME="1.$$NEW_CODE"; \
	sed -i "s/versionCode $$CURRENT_CODE/versionCode $$NEW_CODE/" android/app/build.gradle; \
	sed -i "s/versionName \"$$CURRENT_NAME\"/versionName \"$$NEW_NAME\"/" android/app/build.gradle; \
	echo "Version bumped: $$CURRENT_NAME ($$CURRENT_CODE) -> $$NEW_NAME ($$NEW_CODE)"

# Full Android production build
android: build android\:bump android\:release
	@echo ""
	@echo "============================================"
	@echo "Android production build complete!"
	@echo "AAB file: android/app/build/outputs/bundle/release/app-release.aab"
	@echo ""
	@echo "To upload to Play Store:"
	@echo "1. Go to https://play.google.com/console"
	@echo "2. Create/select your app"
	@echo "3. Upload the AAB file"
	@echo "============================================"

zip:
	@rm -f anqr.zip
	@git archive --format=zip --prefix=anqr/ HEAD -o anqr.zip
