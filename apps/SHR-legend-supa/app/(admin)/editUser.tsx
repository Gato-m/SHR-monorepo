import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useLocalSearchParams, router } from 'expo-router';

export default function EditUser() {
  const { id } = useLocalSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('email, name, role')
      .eq('id', id)
      .single();

    if (error) {
      Alert.alert('Error', error.message);
      router.back();
      return;
    }

    setEmail(data.email);
    setName(data.name ?? '');
    setRole(data.role);
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSave = async () => {
    const { error } = await supabase
      .from('users')
      .update({
        name: name.trim(),
        role,
      })
      .eq('id', id);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    router.back();
  };

  const onDelete = async () => {
    Alert.alert('Confirm delete', `Delete user ${email}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await supabase.from('users').delete().eq('id', id);
          router.back();
        },
      },
    ]);
  };

  if (loading) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Edit User</Text>

      <Text>Email (read-only)</Text>
      <TextInput
        value={email}
        editable={false}
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 12,
          backgroundColor: '#eee',
        }}
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

      <View style={{ height: 20 }} />

      <Button title="Delete User" color="red" onPress={onDelete} />
    </View>
  );
}
