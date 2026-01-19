import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from '@shr/ui';
import { useLegend } from '../state/legend';

export default function IndexScreen() {
  const users = useLegend((s) => s.users);
  const syncUsers = useLegend((s) => s.syncUsers);
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    syncUsers(); // ielādē datus un pieslēdz real-time
  }, []);

  return (
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
  );
}
