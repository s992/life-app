package org.swalsh.life

import android.app.Application

import com.facebook.react.ReactApplication
import com.azendoo.reactnativesnackbar.SnackbarPackage
import com.calendarevents.CalendarEventsPackage
import org.devio.rn.splashscreen.SplashScreenReactPackage
import com.RNFetchBlob.RNFetchBlobPackage
import io.realm.react.RealmReactPackage
import com.oblador.vectoricons.VectorIconsPackage
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader

import java.util.Arrays

class MainApplication : Application(), ReactApplication {

    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            return Arrays.asList(
                    MainReactPackage(),
                    SnackbarPackage(),
                    CalendarEventsPackage(),
                    SplashScreenReactPackage(),
                    RNFetchBlobPackage(),
                    RealmReactPackage(),
                    VectorIconsPackage(),
                    SettingsOpenerPackage()
            )
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, /* native exopackage */ false)
    }
}
