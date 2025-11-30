import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.140:8000/api'; 

export default function NewPetScreen({ navigation }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState(''); // 'male' | 'female' | ''
  const [birthDate, setBirthDate] = useState(''); // '2025-11-30' formatı gibi

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir isim gir 😊');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token'); // login sonrası nereye kaydediyorsan

      const payload = {
        name,
        species,
        breed,
        gender: gender || null,
        birth_date: birthDate || null,
      };

      const response = await axios.post(`${API_URL}/pets`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      console.log('Pet kaydedildi:', response.data);

      Alert.alert('Başarılı', 'Evcil hayvan kaydedildi 🐾', [
        { text: 'Tamam', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log('Yeni pet kaydı hatası:', error?.response?.data || error.message);
      Alert.alert('Hata', 'Kaydedilirken bir sorun oluştu');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Evcil Hayvan Ekle</Text>

      <Text style={styles.label}>İsim *</Text>
      <TextInput
        style={styles.input}
        placeholder="Lucy, Mocha, Bambi..."
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Tür</Text>
      <TextInput
        style={styles.input}
        placeholder="Köpek, Kedi..."
        value={species}
        onChangeText={setSpecies}
      />

      <Text style={styles.label}>Irk</Text>
      <TextInput
        style={styles.input}
        placeholder="Golden, Scottish Fold..."
        value={breed}
        onChangeText={setBreed}
      />

      <Text style={styles.label}>Cinsiyet (male / female)</Text>
      <TextInput
        style={styles.input}
        placeholder="male veya female"
        value={gender}
        onChangeText={setGender}
      />

      <Text style={styles.label}>Doğum Tarihi (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2023-05-10 gibi"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
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
    fontSize: 24,
    color: '#400c66',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#6b5a77',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0d4f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#400c66',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
