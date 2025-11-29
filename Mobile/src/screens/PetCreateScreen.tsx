import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';

export default function PetCreateScreen() {
  
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        Evcil Hayvan ekleme sayfası
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 52,
  },
  title: {
    fontSize: 28,
    color: '#400c66',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  }
});