package org.swalsh.life

import android.os.Bundle

import com.calendarevents.CalendarEventsPackage
import com.facebook.react.ReactActivity

import org.devio.rn.splashscreen.SplashScreen

import com.crashlytics.android.Crashlytics
import io.fabric.sdk.android.Fabric

class MainActivity : ReactActivity() {
    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults)
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this)
        super.onCreate(savedInstanceState)

        if (BuildConfig.USE_CRASHLYTICS) {
            Fabric.with(this, Crashlytics())
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "Life"
    }
}
