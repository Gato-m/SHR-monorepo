import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FlatList, Text, View, Image, ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      // Ping to verify connection
      const { error: pingError } = await supabase.from('users').select('id').limit(1);

      if (pingError) {
        console.log('Supabase connection error:', pingError);
        setError(pingError.message);
        setLoading(false);
        return;
      }

      // Fetch all users
      const { data, error } = await supabase.from('users').select('*');

      console.log('Supabase users data:', data);
      console.log('Supabase users error:', error);

      if (error) {
        setError(error.message);
      } else if (data) {
        setUsers(data);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Loading users…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => {
        const avatarUrl = `${supabaseUrl}/storage/v1/object/public/${item.avatar}`;

        return (
          <View style={{ flexDirection: 'row', padding: 12 }}>
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: 48, height: 48, borderRadius: 24 }}
              onError={(e) => console.log('Image load error:', e.nativeEvent, 'URL:', avatarUrl)}
            />
            <View style={{ marginLeft: 12 }}>
              <Text>{item.name}</Text>
              <Text>{item.position}</Text>
            </View>
          </View>
        );
      }}
    />
  );
}
