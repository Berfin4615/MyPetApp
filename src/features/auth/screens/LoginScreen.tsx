// src/features/auth/screens/LoginScreen.tsx
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../../../shared/styles/theme';
import PrimaryButton from '../../../shared/components/ui/PrimaryButton';
import AuthTextInput from '../components/AuthTextInput';

type Props = {
  navigation: any; // İleride tipini düzeltiriz
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login', { email, password });
    // İleride: navigation.replace('Home');
  };

  const handleGoToRegister = () => {
    console.log('Kayıt ol tıklandı');
    // İleride: navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🐾 MyPetApp</Text>
          <Text style={styles.title}>Hoş geldin</Text>
          <Text style={styles.subtitle}>
            Pet’inin tüm ihtiyaçları tek uygulamada. Devam etmek için giriş yap.
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.form}>
          <AuthTextInput
            label="E-posta"
            placeholder="ornek@mail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <AuthTextInput
            label="Şifre"
            placeholder="••••••••"
            secureTextEntry={false}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Şifremi unuttum</Text>
          </TouchableOpacity>

          <PrimaryButton label="Giriş Yap" onPress={handleLogin} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Hesabın yok mu?</Text>
          <TouchableOpacity onPress={handleGoToRegister}>
            <Text style={styles.footerLink}>Kayıt ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    gap: 8,
    marginTop: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
  },
  form: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.md,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.sm,
  },
  forgotText: {
    fontSize: 12,
    color: colors.muted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 8,
  },
  footerText: {
    color: colors.muted,
    fontSize: 13,
  },
  footerLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
