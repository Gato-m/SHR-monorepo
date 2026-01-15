import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
