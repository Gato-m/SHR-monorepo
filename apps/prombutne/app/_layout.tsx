import { useEffect, useState } from 'react';
import { Stack, Redirect } from 'expo-router';
import { initElectric } from '../../lib/electric/initElectric';

export default function RootLayout() {
  const [status, setStatus] = useState('initializing');

  useEffect(() => {
    async function start() {
      try {
        setStatus('connecting');
        const result = await initElectric();
        if (result?.connected) {
          setStatus('connected');
        } else {
          setStatus('failed');
        }
      } catch (err) {
        console.error('Electric init error:', err);
        setStatus('error');
      }
    }

    start();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
