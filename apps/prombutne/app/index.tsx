import { Text, View, StyleSheet } from 'react-native';
import { useElectricStatus } from '../../lib/electric/useElectricStatus';

export default function Index() {
  const { connected, syncing, error } = useElectricStatus();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prombutne App</Text>
      <Text style={styles.status}>Electric: {connected ? '✅ Connected' : '❌ Disconnected'}</Text>
      <Text style={styles.status}>Sync: {syncing ? 'Syncing…' : 'Idle'}</Text>
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginVertical: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
