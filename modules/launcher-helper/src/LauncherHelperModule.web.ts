import { registerWebModule, NativeModule } from 'expo';
import { InstalledApp } from './LauncherHelper.types';

type LauncherHelperModuleEvents = {
  onChange: () => void;
}

class LauncherHelperModule extends NativeModule<LauncherHelperModuleEvents> {
  async getInstalledPackages(): Promise<InstalledApp[]> {
    return [];
  }
  async launch(packageName: string): Promise<boolean> {
    return false;
  }
};

export default registerWebModule(LauncherHelperModule);
