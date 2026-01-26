import { Tabs } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <ImageBackground
      source={require('../assets/colorBg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <Tabs screenOptions={{ headerShown: false }} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
});
