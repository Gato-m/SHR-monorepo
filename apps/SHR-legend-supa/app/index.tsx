import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FlatList, Text, View, Image } from 'react-native';

export default function IndexScreen() {
  const [users, setUsers] = useState([]);

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      // Ping to verify connection
      const { error: pingError } = await supabase.from('users').select('id').limit(1);

      if (pingError) {
        console.log('Supabase connection error:', pingError);
        return;
      }

      // Fetch all users
      const { data, error } = await supabase.from('users').select('*');

      console.log('Supabase users data:', data);
      console.log('Supabase users error:', error);

      if (!error && data) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

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
