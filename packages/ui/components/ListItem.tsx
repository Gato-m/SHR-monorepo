import { View } from 'react-native';
import { Text } from './Text';
import { Avatar } from './Avatar';
import { theme } from '../theme';

export function ListItem({ title, subtitle, avatar }) {
  return (
    <View style={{ flexDirection: 'row', padding: theme.spacing.md }}>
      <Avatar uri={avatar} />
      <View style={{ marginLeft: theme.spacing.md }}>
        <Text size="subtitle">{title}</Text>
        <Text size="body" style={{ color: theme.colors.secondary }}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
