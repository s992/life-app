package org.swalsh.life

import android.content.Intent
import android.net.Uri
import android.provider.Settings

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SettingsOpener(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    private val context: ReactContext

    init {
        this.context = context
    }

    override fun getName(): String {
        return "SettingsOpener"
    }

    @ReactMethod
    fun openSettings() {
        val intent = Intent()
        val uri = Uri.fromParts("package", context.packageName, null)

        intent.action = Settings.ACTION_APPLICATION_DETAILS_SETTINGS
        intent.data = uri

        context.startActivity(intent)
    }
}
