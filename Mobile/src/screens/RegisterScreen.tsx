import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useState } from 'react';

const API_BASE_URL = 'http://192.168.1.140:8000/api'; 

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !passwordConfirm) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldur.');
            return;
        }

        if (password !== passwordConfirm) {
            Alert.alert('Hata', 'Şifreler eşleşmiyor.');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log('Register response:', response.status, data);

            if (!response.ok) {
                if (data.errors) {
                    const firstError = Object.values(data.errors)[0][0];
                    Alert.alert('Hata', firstError);
                } else {
                    Alert.alert('Hata', data.message || 'Kayıt olurken bir hata oluştu.');
                }
                    return;
                }

            Alert.alert('Başarılı', 'Kayıt tamamlandı, giriş yapılıyor...');
            navigation.replace('Home');
        } catch (err) {
            console.log('Register error:', err);
            Alert.alert('Hata', 'Sunucuya bağlanırken bir sorun oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Kayıt Ol</Text>

        <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            value={name}
            onChangeText={setName}
        />

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

        <TextInput
            style={styles.input}
            placeholder="Şifre tekrar"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            <Text style={styles.buttonText}>
            {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={styles.loginText}>
            Zaten hesabın var mı? Giriş yap
            </Text>
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
        width: '30%',
        height: '10%',
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
    loginText: {
        color: '#400c66',
        textAlign: 'center',
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});
