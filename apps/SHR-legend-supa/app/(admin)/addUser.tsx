import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';

export default function AddUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const onSave = async () => {
    const { error } = await supabase.from('users').insert({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      role,
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Add User</Text>

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>Role</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Button
          title="User"
          onPress={() => setRole('user')}
          color={role === 'user' ? 'blue' : 'gray'}
        />
        <View style={{ width: 10 }} />
        <Button
          title="Admin"
          onPress={() => setRole('admin')}
          color={role === 'admin' ? 'blue' : 'gray'}
        />
      </View>

      <Button title="Save" onPress={onSave} />
    </View>
  );
}
