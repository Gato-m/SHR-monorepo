import { FlatList } from 'react-native';
import { ListItem } from '../../../packages/ui/src';
import { useLegend } from '../state/legend';

export default function IndexScreen() {
  const users = useLegend((s) => s.users);
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <ListItem
          title={item.name}
          subtitle={item.position}
          avatar={`${supabaseUrl}/storage/v1/object/public/${item.avatar}`}
        />
      )}
    />
  );
}
