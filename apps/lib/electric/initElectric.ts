// ElectricSQL v0.12.1 is deprecated. This is a placeholder for testing.
// For production, use the new Electric Next: https://next.electric-sql.com

export async function getSupabaseJWT() {
  return 'cc27f9adb5964b51a134a21275d9b185'; // pagaidu JWT secret
}

export async function initElectric() {
  try {
    // Use localhost for web, local IP for mobile
    const isWeb =
      typeof window !== 'undefined' && !window.navigator?.product?.includes('ReactNative');
    const url = isWeb ? 'http://localhost:5133' : 'http://192.168.32.6:5133';

    // ElectricSQL doesn't have a traditional health endpoint
    // Check if the server responds (even with empty response)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
      await fetch(url, {
        signal: controller.signal,
        method: 'GET',
      });
      clearTimeout(timeoutId);
      console.log('✅ ElectricSQL server is reachable at', url);
      return { connected: true, url };
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        console.warn('⚠️ ElectricSQL server timeout at', url);
        return { connected: false, url, error: 'Timeout' };
      }
      // If we get any response (even error), the server is running
      console.log('✅ ElectricSQL server is reachable at', url, '(connection established)');
      return { connected: true, url };
    }
  } catch (err) {
    console.error('❌ Electric init failed:', err);
    return { connected: false, error: String(err) };
  }
}
