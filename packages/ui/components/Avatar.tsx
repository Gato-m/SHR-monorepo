import { Image } from 'react-native';

export function Avatar({ uri, size = 55 }) {
  return (
    <Image
      source={{ uri }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        marginHorizontal: 8,
      }}
    />
  );
}
