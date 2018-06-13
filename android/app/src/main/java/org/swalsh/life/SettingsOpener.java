package org.swalsh.life;

import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SettingsOpener extends ReactContextBaseJavaModule {
    private ReactContext context;

    public SettingsOpener(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @Override
    public String getName() {
        return "SettingsOpener";
    }

    @ReactMethod
    public void openSettings() {
        Intent intent = new Intent();
        Uri uri = Uri.fromParts("package", context.getPackageName(), null);

        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(uri);

        context.startActivity(intent);
    }
}
