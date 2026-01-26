import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const { data } = await supabase.from('users').select('id, email, role, name').order('email');

    setUsers(data ?? []);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Users</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/(admin)/editUser',
                params: { id: item.id },
              })
            }
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.email}</Text>
            <Text style={{ color: '#666' }}>{item.role}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
