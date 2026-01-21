console.log('[index.tsx] loaded');
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from '@shr/ui';
import { useLegend } from '../../state/legend';
import { View, Text, Button } from 'react-native';
import Constants from 'expo-constants';

export default function IndexScreen() {
  const users = useLegend((s) => s.users);
  console.log('[index.tsx] users state:', users);

  fetch('https://pudjpbkurtrmbfrfdtjr.supabase.co/rest/v1')
    .then((r) => console.log('iOS fetch OK', r.status))
    .catch((e) => console.log('iOS fetch FAIL', e));

  const loading = useLegend((s) => s.loading);

  const syncUsers = useLegend((s) => s.syncUsers);
  const extra = Constants?.manifest?.extra || {};
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || extra.EXPO_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    console.log('[index.tsx] useEffect running, calling syncUsers');
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
