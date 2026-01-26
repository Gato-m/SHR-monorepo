import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export default function Splash() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>splash</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
