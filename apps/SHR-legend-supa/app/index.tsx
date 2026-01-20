import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from '@shr/ui';
import { useLegend } from '../state/legend';
import { View, Text, Button } from 'react-native';

export default function IndexScreen() {
  const users = useLegend((s) => s.users);
  const loading = useLegend((s) => s.loading);

  const syncUsers = useLegend((s) => s.syncUsers);
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    syncUsers(); // ielādē datus un pieslēdz real-time
  }, []);

  return (
    <View>
      <Text>Users count: {users.length}</Text>
      <Text>Loading: {loading ? 'yes' : 'no'}</Text>
      <Button title="Sync" onPress={() => useLegend.getState().syncUsers()} />

      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={item.position}
            email={item.email}
            avatar={`${supabaseUrl}/storage/v1/object/public/${item.avatar}`}
          />
        )}
      />
    </View>
  );
}
