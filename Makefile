.PHONY: dev build gallery gallery\:gif deploy android android\:init android\:sync android\:build android\:release android\:open install clean

# Environment variables
export ENV := PROD
export VITE_ADSENSE_ENABLED := true
export VITE_ADSENSE_CLIENT := ca-pub-XXXXXXXXXXXXXXXX
export VITE_ADSENSE_SLOT_LEFT_SKYSCRAPER := 1234567890
export VITE_ADSENSE_SLOT_RIGHT_SKYSCRAPER := 1234567891
export VITE_ADSENSE_SLOT_SIDEBAR_BOTTOM := 1234567892
export VITE_ADSENSE_SLOT_HEADER_MOBILE := 1234567893
export VITE_ADSENSE_SLOT_MOBILE_ABOVE_QR := 1234567894
export VITE_ADSENSE_SLOT_MOBILE_BELOW_QR := 1234567895
export VITE_ADSENSE_SLOT_GALLERY_LEFT := 1234567896
export VITE_ADSENSE_SLOT_GALLERY_RIGHT := 1234567897
export VITE_ADSENSE_SLOT_STATIC_LEFT := 1234567898
export VITE_ADSENSE_SLOT_STATIC_RIGHT := 1234567899
export VITE_ADSENSE_SLOT_STATIC_BOTTOM := 1234567900
export VITE_ADSENSE_SLOT_PREVIEW_MOBILE_TOP := 1234567901
export VITE_ADSENSE_SLOT_PREVIEW_MOBILE_BOTTOM := 1234567902
export VITE_ADSENSE_SLOT_GALLERY_TOP := 1234567903
export VITE_ADSENSE_SLOT_GALLERY_BOTTOM := 1234567904

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
	npm run build
	npx cap sync android

# Open in Android Studio for development
android\:open:
	npx cap open android

# Build debug APK
android\:build:
	npm run build
	npx cap sync android
	cd android && ./gradlew assembleDebug
	@echo "Debug APK: android/app/build/outputs/apk/debug/app-debug.apk"

# Build release AAB for Play Store
android\:release:
	npm run build
	npx cap sync android
	cd android && ./gradlew bundleRelease
	@echo "Release AAB: android/app/build/outputs/bundle/release/app-release.aab"

# Run on connected device or emulator
android\:run:
	npm run build
	npx cap sync android
	npx cap run android

# Generate release keystore (run once, keep safe!)
android\:keystore:
	@echo "Generating release keystore..."
	keytool -genkey -v -keystore android/app/release-key.keystore -alias anqr -keyalg RSA -keysize 2048 -validity 10000
	@echo "Keystore generated at android/app/release-key.keystore"
	@echo "IMPORTANT: Back up this file and remember your passwords!"

# Full Android production build
android: android\:release
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
