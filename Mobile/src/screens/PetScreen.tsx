import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function PetDetailScreen({ route }) {
  const { pet } = route.params; 
  // pets ekranından: navigation.navigate('PetDetail', { pet: item })

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{pet.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.subText}>
          {pet.type} • {pet.breed}
        </Text>
        <Text style={styles.subText}>
          {pet.age} • {pet.weight}
        </Text>
      </View>

      {/* Bugünün Özeti */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bugünün Özeti</Text>
        <View style={styles.summaryCard}>
          <Text>🥣 Mama: 2/3 öğün</Text>
          <Text>💧 Su: 600 ml</Text>
          <Text>🚶 Aktivite: 35 dk</Text>
          <Text>😊 Ruh hali: Enerjik</Text>
        </View>
      </View>

      {/* Sağlık Kartı */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sağlık & Aşılar</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Aşı Takvimi</Text>
          <Text style={styles.cardText}>Sıradaki: 12.12.2025 • Karma aşı</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Veteriner Ziyaretleri</Text>
          <Text style={styles.cardText}>Son ziyaret: 05.10.2025 • Genel kontrol</Text>
        </TouchableOpacity>
      </View>

      {/* Beslenme Kartı */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beslenme</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Mama Planı</Text>
          <Text style={styles.cardText}>Günde 2 öğün • X Marka Kuzu & Pirinç</Text>
        </TouchableOpacity>
      </View>

      {/* Notlar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notlar</Text>
        <View style={styles.noteBox}>
          <Text style={styles.cardText}>
            Bugün parka gittik, biraz yoruldu ama keyfi yerindeydi. 
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#400c66',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c1438',
  },
  subText: {
    fontSize: 14,
    color: '#7b6b86',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#400c66',
    marginBottom: 8,
  },
  summaryCard: {
    backgroundColor: '#f9f5ff',
    borderRadius: 12,
    padding: 12,
  },
  card: {
    backgroundColor: '#f9f5ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2c1438',
  },
  cardText: {
    fontSize: 13,
    color: '#6b5a77',
  },
  noteBox: {
    backgroundColor: '#fdf5ff',
    borderRadius: 12,
    padding: 12,
  },
});
