package expo.modules.launcherhelper

import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.ByteArrayOutputStream


class LauncherHelperModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("LauncherHelper")
        AsyncFunction("getInstalledPackages") {

            // Load the installed packages list
            val pManager: PackageManager = appContext.currentActivity!!.packageManager
            val intent = Intent(Intent.ACTION_MAIN, null)
            intent.addCategory(Intent.CATEGORY_LAUNCHER)
            val allApps = pManager.queryIntentActivities(intent, 0)

            // Create a list of installed packages
            val packages = ArrayList<Map<String, String>>()
            for (ri in allApps) {

                // Parse
                val label = ri.loadLabel(pManager)
                val packageName = ri.activityInfo.packageName

                // Parse icon
                val icon = pManager.getApplicationIcon(packageName)
                val bitmap = Bitmap.createBitmap(128, 128, Bitmap.Config.ARGB_8888)
                val canvas = Canvas(bitmap)
                icon.setBounds(0, 0, canvas.width, canvas.height)
                icon.draw(canvas)

                // Save bitmap
                val output = ByteArrayOutputStream()
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, output)
                val compressed = output.toByteArray()

                // To base64
                val base64 = android.util.Base64.encodeToString(compressed, android.util.Base64.DEFAULT)

                // Add result
                packages.add(mapOf("label" to label.toString(), "packageName" to packageName, "icon" to base64))
            }
            packages
        }
        AsyncFunction("launch") { packageName: String ->
            val pManager: PackageManager = appContext.currentActivity!!.packageManager
            val intent = pManager.getLaunchIntentForPackage(packageName)
            if (intent != null) {
                appContext.currentActivity!!.startActivity(intent)
                true
            } else {
                false
            }
        }
    }
}
