import { useEffect, useState } from 'react';

export function useElectricStatus() {
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simple connection check
    async function checkConnection() {
      try {
        // Use localhost for web, local IP for mobile
        const isWeb =
          typeof window !== 'undefined' && !window.navigator?.product?.includes('ReactNative');
        const url = isWeb ? 'http://localhost:5133' : 'http://192.168.32.6:5133';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        try {
          await fetch(url, { signal: controller.signal });
          clearTimeout(timeoutId);
          setConnected(true);
          setError(null);
        } catch (err: any) {
          clearTimeout(timeoutId);
          if (err.name === 'AbortError') {
            setConnected(false);
            setError('Timeout');
          } else {
            // If we get any response (even error), the server is running
            setConnected(true);
            setError(null);
          }
        }
      } catch (err) {
        setConnected(false);
        setError(String(err));
      }
    }

    checkConnection();
    const interval = setInterval(checkConnection, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { connected, syncing, error };
}
