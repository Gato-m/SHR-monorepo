import { View, Button, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';

export default function AdminMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin izvēlne</Text>
      <Button title="Lietotāji" onPress={() => router.push('/(admin)/users')} />
      <Button title="Pievienot lietotāju" onPress={() => router.push('/(admin)/addUser')} />
      <Button title="Rediģēt lietotāju" onPress={() => router.push('/(admin)/editUser')} />
      <Button title="Eksportēt datus" onPress={() => router.push('/(admin)/exportData')} />
      <Button title="Atpakaļ uz izvēlni" onPress={() => router.replace('/(admin)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
});
