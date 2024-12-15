import { NativeModule, requireNativeModule } from 'expo';

import { InstalledApp, LauncherHelperModuleEvents } from './LauncherHelper.types';

declare class LauncherHelperModule extends NativeModule<LauncherHelperModuleEvents> {
  getInstalledPackages(): Promise<InstalledApp[]>;
  launch(packageName: string): Promise<boolean>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<LauncherHelperModule>('LauncherHelper');
