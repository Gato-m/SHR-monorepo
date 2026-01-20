import { Pressable, Text } from 'react-native';
import { theme } from '../theme';

export function Button({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontWeight: '600' }}>{title}</Text>
    </Pressable>
  );
}
