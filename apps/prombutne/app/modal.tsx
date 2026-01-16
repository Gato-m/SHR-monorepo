import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function Modal() {
  return (
    <>
      <Stack.Screen options={{ title: 'Modal' }} />
      <View style={styles.container}>
        <Text>Modal Screen</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
