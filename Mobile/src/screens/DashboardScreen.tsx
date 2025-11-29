import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';

const pets = [
  {
    id: '1',
    name: 'Lucy',
    type: 'Köpek',
    breed: 'Mixed',
    age: '2 yaş',
    weight: '18 kg',
    nextVaccine: '12.12.2025',
  },
  {
    id: '2',
    name: 'Mocha',
    type: 'Kedi',
    breed: 'Scottish Fold',
    age: '3 yaş',
    weight: '4.5 kg',
    nextVaccine: '05.01.2026',
  },
  {
    id: '3',
    name: 'Bambi',
    type: 'Köpek',
    breed: 'Mixed',
    age: '1 yaş',
    weight: '10 kg',
    nextVaccine: '20.11.2025',
  },
];

export default function DashboardScreen({  navigation }) {
  const renderPet = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('Pet', { pet: item })}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>{item.type} • {item.breed}</Text>
        <Text style={styles.detail}>{item.age} • {item.weight}</Text>
        <Text style={styles.vaccine}>Sonraki aşı: {item.nextVaccine}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        <Image source={require('../assets/paw.png')} style={{ width: 25, height: 25 }} />
        Evcil Hayvanlarım
        <Image source={require('../assets/paw.png')} style={{ width: 25, height: 25 }} />
      </Text>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderPet}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('PetCreate')} 
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
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
  },
  listContent: {
    paddingVertical: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f5ff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#400c66',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c1438',
    marginBottom: 2,
  },
  detail: {
    fontSize: 13,
    color: '#6b5a77',
  },
  vaccine: {
    marginTop: 4,
    fontSize: 12,
    color: '#9a4fd6',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#400c66',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold',
  },
});