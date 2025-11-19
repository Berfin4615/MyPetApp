import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Ana Sayfaya Hoşgeldiniz</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  }
});
