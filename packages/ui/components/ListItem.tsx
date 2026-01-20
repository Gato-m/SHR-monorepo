import { View } from 'react-native';
import { Text } from './Text';
import { Avatar } from './Avatar';
import { theme } from '../theme';

export function ListItem({ title, subtitle, email, avatar }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        borderBottomColor: theme.colors.gray,
        borderBottomWidth: 1,
        borderRadius: theme.radius.lg,
        alignItems: 'center',
      }}
    >
      <Avatar uri={avatar} />
      <View style={{ marginLeft: theme.spacing.md, justifyContent: 'center' }}>
        <Text
          size="subtitle"
          style={{ fontWeight: theme.weights.bold, marginBottom: theme.spacing.xxs }}
        >
          {title}
        </Text>
        <Text size="body" style={{ color: theme.colors.darkgray, marginBottom: theme.spacing.xxs }}>
          {subtitle}
        </Text>
        <Text size="body" style={{ color: theme.colors.darkgray }}>
          {email}
        </Text>
      </View>
    </View>
  );
}
