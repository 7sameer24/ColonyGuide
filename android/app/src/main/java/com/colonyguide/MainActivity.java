package com.colonyguide;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
// import com.zoontek.rnbootsplash.RNBootSplash; // <- add this necessary import
import android.os.Build;
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here
import android.app.NotificationChannel;
import android.media.AudioAttributes;
import android.net.Uri;
import android.content.ContentResolver;
import android.app.NotificationManager;

import androidx.core.app.NotificationCompat;



public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

 @Override
  protected  void onCreate(Bundle savedInstanceState){
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel notificationChannel = new NotificationChannel("sound_channel", "Notification", NotificationManager.IMPORTANCE_HIGH);
      notificationChannel.setShowBadge(true);
      notificationChannel.setDescription("");
      AudioAttributes att = new AudioAttributes.Builder()
              .setUsage(AudioAttributes.USAGE_NOTIFICATION)
              .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
              .build();
      notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/ring_bell"), att);
      notificationChannel.enableVibration(true);
      notificationChannel.setVibrationPattern(new long[]{400, 400});
      notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(notificationChannel);
    }
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "ColonyGuide";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      // @Override
      // protected void loadApp(String appKey) {
      //   RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
      //   super.loadApp(appKey);
      // }
    };
  }

}
