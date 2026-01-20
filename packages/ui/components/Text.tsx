import { Text as RNText } from 'react-native';
import { theme } from '../theme';

export function Text({ children, size = 'body', style, ...props }) {
  return (
    <RNText style={[{ fontSize: theme.text[size], color: theme.colors.text }, style]} {...props}>
      {children}
    </RNText>
  );
}
