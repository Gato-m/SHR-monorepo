import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}

// // app/_layout.tsx
// import { useSession } from '@/state/session';

// export default function RootLayout() {
//   const { user } = useSession();

//   if (!user) return <Redirect href="/(unauth)/splash" />;
//   if (user.role === 'admin') return <Redirect href="/(admin)" />;
//   return <Redirect href="/(user)" />;
// }
