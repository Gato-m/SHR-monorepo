import { Image } from 'react-native';

export function Avatar({ uri, size = 48 }) {
  return (
    <Image
      source={{ uri }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    />
  );
}
