import { useState } from 'react';
import { router } from 'expo-router';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../state/auth';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const initAuth = useAuth((s) => s.initAuth);

  const handleSignup = async () => {
    setError('');
    try {
      // 1. Pārbaudām whitelist (users tabulu)
      const { data: allowedUser, error: userError } = await supabase
        .from('users')
        .select('id, email, role, name')
        .eq('email', email)
        .single();

      if (userError || !allowedUser) {
        setError('Šis e‑pasts nav atļauts reģistrācijai');
        return;
      }

      // 2. Ja whitelist OK → izveidojam Auth lietotāju
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // 3. Atjaunojam zustand store ar initAuth
      await initAuth();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reģistrācija</Text>
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
      <Button title="Reģistrēties" onPress={handleSignup} />
      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Jau ir konts?{' '}
        <Text style={{ color: 'blue' }} onPress={() => router.push('/(unauth)/login')}>
          Ienākt
        </Text>
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
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
