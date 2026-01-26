import { Stack } from 'expo-router';
import { useAuth } from '../../state/auth';

export default function UnauthLayout() {
  const user = useAuth((s) => s.user);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" /> // ja jau ielogots
      ) : (
        <Stack.Screen name="login" />
      )}{' '}
      // ja nav ielogots → login
    </Stack>
  );
}
