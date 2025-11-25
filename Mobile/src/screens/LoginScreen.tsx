import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useState } from 'react';

const API_BASE_URL = 'http://192.168.1.140:8000/api'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifreyi gir.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.message || 'Giriş başarısız.';
        Alert.alert('Hata', msg);
        return;
      }

      const data = await response.json();

      console.log('Login success:', data);

      navigation.replace('Dashboard'); 
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Hata', 'Sunucuya bağlanırken bir problem oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Hesabınız yok mu? Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: '100%',
    height: '30%',
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#400c66',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#400c66',
    padding: 14,
    width: '50%',
    borderRadius: 15,
    marginTop: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#400c66',
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});
