import * as React from 'react';
import { InstalledApp } from './src/LauncherHelper.types';
import LauncherHelperModule from './src/LauncherHelperModule';
export { default } from './src/LauncherHelperModule';
export * from './src/LauncherHelper.types';

export function useInstalledApps() {
    const [apps, setApps] = React.useState<InstalledApp[]>([]);
    React.useEffect(() => {
        // Load the installed apps
        (async () => {
            const installedApps = await LauncherHelperModule.getInstalledPackages();
            setApps(installedApps);
        })();
    }, []);
    return apps;
}