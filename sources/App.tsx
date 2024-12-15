import * as React from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import launcherHelper, { useInstalledApps } from '../modules/launcher-helper';

export default function App() {

  let apps = useInstalledApps();
  apps = apps.filter((v) => v.packageName !== 'com.ex3ndr.agent.launcher');
  React.useEffect(() => {
    NavigationBar.setPositionAsync('absolute');
  })

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar style="light" translucent={true} />
      <SafeAreaView style={styles.container}>
        <Image
          source={require('./assets/background.png')}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          resizeMode="contain"
        />
        <View style={{ paddingHorizontal: 16, paddingVertical: 16, flexWrap: 'wrap' }}>
          {apps.map((v) => (
            <Pressable style={{ width: 200, flexDirection: 'row', gap: 8 }} onPress={() => launcherHelper.launch(v.packageName)} key={v.packageName}>
              <Image source={{ uri: `data:image/png;base64,${v.icon}` }} style={{ width: 24, height: 24 }} />
              <Text style={{ color: '#fff', fontSize: 20, height: 48 }}>
                {v.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f00'
  },
});

