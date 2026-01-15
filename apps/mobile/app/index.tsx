import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome</Text>
      <Link href="/(tabs)">Go to tabs</Link>
    </View>
  );
}
