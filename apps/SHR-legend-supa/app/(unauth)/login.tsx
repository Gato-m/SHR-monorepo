import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../state/auth';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notRegistered, setNotRegistered] = useState(false);

  const initAuth = useAuth((s) => s.initAuth);

  const handleLogin = async () => {
    setError('');
    setNotRegistered(false);
    try {
      // 1. Check if user exists in whitelist (users table)
      const { data: allowedUser, error: userError } = await supabase
        .from('users')
        .select('id, email, role, name')
        .eq('email', email)
        .single();

      if (userError || !allowedUser) {
        setNotRegistered(true);
        return;
      }

      // 2. If whitelist OK → try to sign in with Supabase Auth
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        if (loginError.message === 'Invalid login credentials') {
          setError('Kļūdaini pieslēgšanās dati');
        } else {
          setError(loginError.message);
        }
        return;
      }

      // 3. Update zustand store with initAuth
      await initAuth();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pieslēgšanās</Text>
      <TextInput
        style={styles.input}
        placeholder="E-pasts"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Parole"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ienākt" onPress={handleLogin} />
      <Text style={{ marginTop: 20, color: 'red', textAlign: 'center' }}>
        {notRegistered ? 'Šis e‑pasts nav reģistrēts.' : 'Nav konta?'}{' '}
        <Text style={{ color: 'blue' }} onPress={() => router.push('/(unauth)/signup')}>
          Reģistrēties
        </Text>
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
  },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
});
