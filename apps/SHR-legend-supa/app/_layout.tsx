import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
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
