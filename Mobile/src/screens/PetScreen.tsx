import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const API_BASE_URL = 'http://192.168.1.140:8000/api';

export default function PetScreen({ route }) {
  const { petId } = route.params; 
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [vaccines, setVaccines] = useState([]);
  const [vaccinesLoading, setVaccinesLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [todayFeed, setTodayFeed] = useState({
    logs: [],
    total_gram: 0,
    count: 0,
  });
  const [feedLoading, setFeedLoading] = useState(false);


  const vaccinesForSelectedDate = selectedDate
  ? vaccines.filter(v =>
      v.given_at === selectedDate || v.next_due_at === selectedDate
    )
  : [];

  const [newVaccine, setNewVaccine] = useState({
    name: '',
    next_due_at: '', // YYYY-MM-DD
    given_at: '',    // opsiyonel
    notes: '',
  });

  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    birth_date: '',
    current_weight_kg: '',
  });

  // Genel state setter
  const updateForm = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const updateVaccineForm = (key, value) => {
    setNewVaccine(prev => ({ ...prev, [key]: value }));
  };

  // 1) Sayfa açılınca ilgili pet'i backend'den çek
  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');

        const res = await axios.get(`${API_BASE_URL}/pets/${petId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        setPet(res.data);
        setForm({
          name: res.data.name || '',
          species: res.data.species || '',
          breed: res.data.breed || '',
          birth_date: res.data.birth_date || '',
          current_weight_kg: res.data.current_weight_kg
            ? String(res.data.current_weight_kg)
            : '',
        });
      } catch (err) {
        console.log('Pet detayı hatası:', err.response?.data || err.message);
        Alert.alert('Hata', 'Pet bilgileri alınırken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };
    const fetchNotes = async () => {
      try {
        setNotesLoading(true);
        const token = await AsyncStorage.getItem('token');

        const res = await axios.get(`${API_BASE_URL}/pets/${petId}/notes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        setNotes(res.data);
      } catch (err) {
        console.log('Pet notları hatası:', err.response?.data || err.message);
      } finally {
        setNotesLoading(false);
      }
    };

    const fetchVaccines = async () => {
      try {
        setVaccinesLoading(true);
        const token = await AsyncStorage.getItem('token');

        const res = await axios.get(
          `${API_BASE_URL}/pets/${petId}/vaccinations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        setVaccines(res.data);
      } catch (err) {
        console.log('Aşı listesi hatası:', err.response?.data || err.message);
      } finally {
        setVaccinesLoading(false);
      }
    };

    const fetchTodayFeed = async () => {
      try {
        setFeedLoading(true);
        const token = await AsyncStorage.getItem('token');

        const res = await axios.get(
          `${API_BASE_URL}/pets/${petId}/feed-logs/today`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        setTodayFeed(res.data);
      } catch (err) {
        console.log('Bugün mama özeti hatası:', err.response?.data || err.message);
      } finally {
        setFeedLoading(false);
      }
    };
    fetchTodayFeed();
    fetchPet();
    fetchNotes();
    fetchVaccines();
  }, [petId]);

  // 2) Kaydet butonu → PUT /pets/{id}
  const handleSave = async () => {
    try {
      setSaving(true);
      const token = await AsyncStorage.getItem('token');

      const payload = {
        name: form.name,
        species: form.species || null,
        breed: form.breed || null,
        birth_date: form.birth_date || null,
        current_weight_kg: form.current_weight_kg
          ? parseFloat(form.current_weight_kg)
          : null,
      };

      const res = await axios.put(`${API_BASE_URL}/pets/${petId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      setPet(res.data);       // ekranda da güncellensin
      setEditMode(false);     // formdan çık
      Alert.alert('Başarılı', 'Pet bilgileri güncellendi 🐾');
    } catch (err) {
      console.log('Pet güncelleme hatası:', err.response?.data || err.message);
      Alert.alert('Hata', 'Pet güncellenirken bir sorun oluştu.');
    } finally {
      setSaving(false);
    }
  };
  
  const handleAddNote = async () => {
    if (!newNote.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir not yaz 💜');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.post(
        `${API_BASE_URL}/pets/${petId}/notes`,
        { note: newNote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      // Yeni notu listeye en üste ekle
      setNotes((prev) => [res.data, ...prev]);
      setNewNote('');
    } catch (err) {
      console.log('Not ekleme hatası:', err.response?.data || err.message);
      Alert.alert('Hata', 'Not eklenirken bir sorun oluştu.');
    }
  };

  const handleAddVaccine = async () => {
    if (!newVaccine.name.trim()) {
      Alert.alert('Uyarı', 'Lütfen aşının adını yaz 🩺');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const payload = {
        name: newVaccine.name,
        given_at: newVaccine.given_at || null,
        next_due_at: newVaccine.next_due_at || null,
        notes: newVaccine.notes || null,
      };

      const res = await axios.post(
        `${API_BASE_URL}/pets/${petId}/vaccinations`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      // Yeni aşıyı listenin başına ekle
      setVaccines(prev => [res.data, ...prev]);

      // Formu temizle
      setNewVaccine({
        name: '',
        next_due_at: '',
        given_at: '',
        notes: '',
      });

      Alert.alert('Başarılı', 'Aşı kaydı eklendi 💉');
    } catch (err) {
      console.log('Aşı ekleme hatası:', err.response?.data || err.message);
      Alert.alert('Hata', 'Aşı eklenirken bir sorun oluştu.');
    }
  };

    if (loading || !pet) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Yükleniyor...</Text>
      </View>
    );
  }

  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  const markedDates = vaccines.reduce((acc, v) => {
    if (v.given_at) {
      const d = v.given_at; // "YYYY-MM-DD"
      if (!acc[d]) acc[d] = { dots: [] };
      acc[d].dots = acc[d].dots || [];
      acc[d].dots.push({
        key: `given-${v.id}`,
        color: '#999999', // geçmiş = gri
      });
    }

    // Gelecek aşı tarihi (next_due_at)
    if (v.next_due_at) {
      const d2 = v.next_due_at;
      if (!acc[d2]) acc[d2] = { dots: [] };
      acc[d2].dots = acc[d2].dots || [];
      acc[d2].dots.push({
        key: `next-${v.id}`,
        color: '#400c66', // gelecek = mor
      });
    }

    return acc;
  }, {});

  // Seçili günü vurgula
  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: '#f3e8ff',
      selectedTextColor: '#400c66',
    };
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{pet.name?.charAt(0)}</Text>
        </View>
        {editMode ? (
          <TextInput
            style={[styles.name, styles.inputInline]}
            value={form.name}
            onChangeText={(text) => updateForm('name', text)}
          />
        ) : (
          <Text style={styles.name}>{pet.name}</Text>
        )}

        <Text style={styles.subText}>
          {(pet.species || 'Tür yok') + ' • ' + (pet.breed || 'Irk yok')}
        </Text>
        {pet.birth_date && (
          <Text style={styles.subText}>Doğum tarihi: {pet.birth_date}</Text>
        )}
        {pet.current_weight_kg && (
          <Text style={styles.subText}>Kilo: {pet.current_weight_kg} kg</Text>
        )}

        {/* Düzenle / Kaydet butonu */}
        {!editMode ? (
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: '#400c66' }]}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.editButtonText}>Düzenle</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: 'row', marginTop: 12, gap: 8 }}>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: '#999' }]}
              onPress={() => {
                // eski pet verisine geri dön
                setForm({
                  name: pet.name || '',
                  species: pet.species || '',
                  breed: pet.breed || '',
                  birth_date: pet.birth_date || '',
                  current_weight_kg: pet.current_weight_kg
                    ? String(pet.current_weight_kg)
                    : '',
                });
                setEditMode(false);
              }}
            >
              <Text style={styles.editButtonText}>Vazgeç</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: '#400c66' }]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.editButtonText}>
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Eğer editMode'daysan genel bilgiler için input alanları */}
      {editMode && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genel Bilgiler</Text>

          <Text style={styles.label}>Tür</Text>
          <TextInput
            style={styles.input}
            value={form.species}
            onChangeText={(text) => updateForm('species', text)}
            placeholder="Köpek, Kedi..."
          />

          <Text style={styles.label}>Irk</Text>
          <TextInput
            style={styles.input}
            value={form.breed}
            onChangeText={(text) => updateForm('breed', text)}
            placeholder="Golden, Scottish Fold..."
          />

          <Text style={styles.label}>Doğum Tarihi (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={form.birth_date}
            onChangeText={(text) => updateForm('birth_date', text)}
            placeholder="2023-05-10"
          />

          <Text style={styles.label}>Kilo (kg)</Text>
          <TextInput
            style={styles.input}
            value={form.current_weight_kg}
            onChangeText={(text) => updateForm('current_weight_kg', text)}
            placeholder="18.5"
            keyboardType="numeric"
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bugünün Özeti</Text>
        <View style={styles.summaryCard}>
          {feedLoading ? (
            <Text>🥣 Mama: yükleniyor...</Text>
          ) : (
            <Text>
              🥣 Mama: {todayFeed.count} kayıt • {todayFeed.total_gram} g
            </Text>
          )}

          {/* Su & Aktiviteyi sonra bağlarız */}
          <Text>💧 Su: yakında</Text>
          <Text>🚶 Aktivite: yakında</Text>
          <Text>😊 Ruh hali: notlardan türetebiliriz 😌</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.editButton, { backgroundColor: '#400c66', marginTop: 8 }]}
        onPress={async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            const res = await axios.post(
              `${API_BASE_URL}/pets/${petId}/feed-logs`,
              { amount_gram: 80, meal_type: 'öğün' },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                },
              }
            );

            setTodayFeed(prev => ({
              ...prev,
              total_gram: prev.total_gram + (res.data.amount_gram || 0),
              count: prev.count + 1,
              logs: [res.data, ...(prev.logs || [])],
            }));
          } catch (err) {
            console.log('Mama ekleme hızlı buton hatası:', err.response?.data || err.message);
            Alert.alert('Hata', 'Mama kaydedilirken sorun oluştu.');
          }
        }}
      >
        <Text style={styles.editButtonText}>Bugün mama verdim (+80g)</Text>
      </TouchableOpacity>



      {/* Sağlık & Aşılar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sağlık & Aşılar</Text>

        {/* Yeni Aşı Ekle Formu */}
        <View style={[styles.card, { marginBottom: 12 }]}>
          <Text style={styles.cardTitle}>Yeni Aşı Kaydı</Text>

          <Text style={styles.label}>Aşı Adı *</Text>
          <TextInput
            style={styles.input}
            value={newVaccine.name}
            onChangeText={text => updateVaccineForm('name', text)}
            placeholder="Karma, Kuduz..."
          />

          <Text style={styles.label}>Yapıldığı Tarih (opsiyonel)</Text>
          <TextInput
            style={styles.input}
            value={newVaccine.given_at}
            onChangeText={text => updateVaccineForm('given_at', text)}
            placeholder="2025-12-04"
          />

          <Text style={styles.label}>Sıradaki Tarih (opsiyonel)</Text>
          <TextInput
            style={styles.input}
            value={newVaccine.next_due_at}
            onChangeText={text => updateVaccineForm('next_due_at', text)}
            placeholder="2026-12-04"
          />

          <Text style={styles.label}>Notlar</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={newVaccine.notes}
            onChangeText={text => updateVaccineForm('notes', text)}
            placeholder="Doz, marka, ek notlar..."
            multiline
          />

          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: '#400c66', marginTop: 8, alignSelf: 'flex-end' }]}
            onPress={handleAddVaccine}
          >
            <Text style={styles.editButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Aşı Takvimi</Text>

        <Calendar
          markedDates={markedDates}
          markingType="multi-dot"
          onDayPress={(day) => {
            // day.dateString: "YYYY-MM-DD"
            setSelectedDate(day.dateString);
          }}
          theme={{
            arrowColor: '#400c66',
            todayTextColor: '#400c66',
          }}
        />
        {/* Seçili güne ait aşılar */}
        {selectedDate && (
          <View style={[styles.card, { marginTop: 12 }]}>
            <Text style={styles.cardTitle}>
              {selectedDate} için aşılar
            </Text>

            {vaccinesForSelectedDate.length === 0 ? (
              <Text style={styles.cardText}>
                Bu gün için kayıtlı aşı yok.
              </Text>
            ) : (
              vaccinesForSelectedDate.map((v) => (
                <View key={v.id} style={{ marginBottom: 8 }}>
                  <Text style={[styles.cardText, { fontWeight: '600' }]}>
                    {v.name}
                  </Text>
                  {v.given_at === selectedDate && (
                    <Text style={styles.cardText}>Yapıldı</Text>
                  )}
                  {v.next_due_at === selectedDate && (
                    <Text style={styles.cardText}>Randevu</Text>
                  )}
                </View>
              ))
            )}
          </View>
        )}
        {/* Legend / Açıklama */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#999', marginRight: 6 }} />
            <Text style={styles.cardText}>Geçmiş aşı</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#400c66', marginRight: 6 }} />
            <Text style={styles.cardText}>Yaklaşan aşı</Text>
          </View>
        </View>
      </View>


      {/* Beslenme Kartı */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beslenme</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mama Planı</Text>
          <Text style={styles.cardText}>Bu alanı da sonra dinamik yaparız 🐾</Text>
        </View>
      </View>

      {/* Notlar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notlar</Text>

        {/* Yeni not ekleme alanı */}
        <TextInput
          style={styles.input}
          value={newNote}
          onChangeText={setNewNote}
          placeholder="Bugün neler yaptınız? 🐾"
          multiline
        />
        <TouchableOpacity
          style={[styles.editButton, { alignSelf: 'flex-end', backgroundColor: '#400c66', marginTop: 8 }]}
          onPress={handleAddNote}
        >
          <Text style={styles.editButtonText}>Not Ekle</Text>
        </TouchableOpacity>

        {/* Not listesi */}
        {notesLoading ? (
          <Text style={{ marginTop: 8 }}>Notlar yükleniyor...</Text>
        ) : notes.length === 0 ? (
          <Text style={{ marginTop: 8, color: '#7b6b86' }}>
            Henüz hiç not eklememişsin.
          </Text>
        ) : (
          notes.map((n) => (
            <View key={n.id} style={[styles.noteBox, { marginTop: 8 }]}>
              <Text style={[styles.cardText, { marginBottom: 4 }]}>
                {new Date(n.created_at).toLocaleDateString('tr-TR')} 
              </Text>
              <Text style={styles.cardText}>{n.note}</Text>
            </View>
          ))
        )}
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
  inputInline: {
    borderBottomWidth: 1,
    borderColor: '#e0d4f5',
    paddingHorizontal: 4,
  },
  subText: {
    fontSize: 14,
    color: '#7b6b86',
  },
  editButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
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
});
