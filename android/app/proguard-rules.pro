# ============================================
# ANQR ProGuard/R8 Rules
# Production-optimized for Play Store
# ============================================

# Preserve line numbers for crash reporting/deobfuscation
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# ============================================
# Capacitor WebView JavaScript Interface
# ============================================
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep Capacitor plugin classes
-keep class com.getcapacitor.** { *; }
-keep class link.anqr.app.** { *; }
-dontwarn com.getcapacitor.**

# ============================================
# Google Mobile Ads (AdMob)
# ============================================
-keep class com.google.android.gms.ads.** { *; }
-keep class com.google.ads.** { *; }
-dontwarn com.google.android.gms.ads.**

# Keep AdMob initialization
-keep class com.google.android.gms.internal.** { *; }

# ============================================
# AndroidX and Support Libraries
# ============================================
-keep class androidx.** { *; }
-keep interface androidx.** { *; }
-dontwarn androidx.**

-keep class android.support.** { *; }
-dontwarn android.support.**

# ============================================
# WebView
# ============================================
-keepclassmembers class * extends android.webkit.WebViewClient {
    public void *(android.webkit.WebView, java.lang.String, android.graphics.Bitmap);
    public boolean *(android.webkit.WebView, java.lang.String);
    public void *(android.webkit.WebView, java.lang.String);
}

-keepclassmembers class * extends android.webkit.WebChromeClient {
    public void *(android.webkit.WebView, java.lang.String, java.lang.String, int, android.webkit.JsResult);
}

# ============================================
# Serialization (for Capacitor data transfer)
# ============================================
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# ============================================
# JSON Processing
# ============================================
-keepclassmembers class * {
    @org.json.JSONObject *;
}

# ============================================
# Enums
# ============================================
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# ============================================
# Native Methods
# ============================================
-keepclasseswithmembernames class * {
    native <methods>;
}

# ============================================
# Parcelables
# ============================================
-keepclassmembers class * implements android.os.Parcelable {
    public static final ** CREATOR;
}

# ============================================
# R8 Full Mode Compatibility
# ============================================
-allowaccessmodification
-repackageclasses ''

# Aggressive optimization passes
-optimizationpasses 5
-dontusemixedcaseclassnames
-verbose

# ============================================
# Remove Logging in Release
# ============================================
-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int d(...);
    public static int i(...);
    public static int w(...);
}

# Remove System.out prints
-assumenosideeffects class java.io.PrintStream {
    public void println(...);
    public void print(...);
}

# ============================================
# Additional Size Optimizations
# ============================================
# Remove unused code more aggressively
-dontnote **
-dontwarn **

# Merge similar classes where possible
-mergeinterfacesaggressively
