import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator, ImageBackground } from 'react-native';
import { useAuth } from '../state/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const user = useAuth((s) => s.user);
  const initDone = useAuth((s) => s.initDone);
  const initAuth = useAuth((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (!initDone) return;

    if (!user) {
      router.replace('/(unauth)/login');
    } else if (user.role === 'admin') {
      router.replace('/(admin)');
    } else {
      router.replace('/(tabs)');
    }
  }, [user, initDone]);

  // fallback kamēr initAuth vēl nav pabeigts
  if (!initDone) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('../app/assets/colorBg.jpg')}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </ImageBackground>
    </SafeAreaProvider>
  );
}
