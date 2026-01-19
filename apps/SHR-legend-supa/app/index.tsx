import { useEffect } from 'react';
import { FlatList, Text, View, Image, ActivityIndicator } from 'react-native';
import { useLegend } from '../state/legend';

export default function IndexScreen() {
  const users = useLegend((s) => s.users);
  const loading = useLegend((s) => s.loading);
  const error = useLegend((s) => s.error);
  const syncUsers = useLegend((s) => s.syncUsers);

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    syncUsers();
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
