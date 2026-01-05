package link.anqr.app;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.webkit.WebView;

import androidx.core.view.WindowCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  private static boolean activityCallbacksRegistered = false;

  private static final String TAG = "ANQR";

  @Override
  public void onCreate(Bundle savedInstanceState) {
    // Use Log.e instead of Log.d because ProGuard strips debug logs in release builds
    Log.e(TAG, "MainActivity.onCreate starting");
    
    // Register local Capacitor plugins BEFORE super.onCreate()
    // This is required for Capacitor to properly initialize the plugin
    registerPlugin(MediaStoreWriterPlugin.class);
    Log.e(TAG, "MediaStoreWriterPlugin registered");
    
    super.onCreate(savedInstanceState);
    Log.e(TAG, "Capacitor bridge initialized");
    
    // Enable WebView debugging to see console.log in logcat (even in release builds)
    // This helps diagnose AdMob and other JavaScript issues
    try {
      WebView.setWebContentsDebuggingEnabled(true);
      Log.e(TAG, "WebView debugging enabled");
    } catch (Exception e) {
      Log.e(TAG, "Failed to enable WebView debugging", e);
    }

    // Ensure AdMob's AdActivity has sane insets handling so the close button
    // is visible/clickable on newer Android versions.
    if (!activityCallbacksRegistered) {
      activityCallbacksRegistered = true;
      getApplication().registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
        @Override
        public void onActivityCreated(Activity activity, Bundle bundle) {
          if (!"com.google.android.gms.ads.AdActivity".equals(activity.getClass().getName())) {
            return;
          }
          Window window = activity.getWindow();
          if (window != null) {
            WindowCompat.setDecorFitsSystemWindows(window, true);
          }
        }

        @Override public void onActivityStarted(Activity activity) {}
        @Override public void onActivityResumed(Activity activity) {}
        @Override public void onActivityPaused(Activity activity) {}
        @Override public void onActivityStopped(Activity activity) {}
        @Override public void onActivitySaveInstanceState(Activity activity, Bundle outState) {}
        @Override public void onActivityDestroyed(Activity activity) {}
      });
    }
  }
}
