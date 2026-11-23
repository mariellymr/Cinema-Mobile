import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../services/api';
import type { AuthStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = { email: '', password: '' };
    let valid = true;

    if (!email.trim()) {
      next.email = 'O e-mail é obrigatório.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Formato de e-mail inválido.';
      valid = false;
    }

    if (!password.trim()) {
      next.password = 'A senha é obrigatória.';
      valid = false;
    }

    setFieldErrors(next);
    return valid;
  };

  const handleLogin = async () => {
    setError('');
    if (!validate()) return;

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.ok) {
      setError(result.message || 'E-mail ou senha inválidos.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.brand}>Lumière</Text>
          <Text style={styles.subtitle}>Cinema &amp; Ingressos</Text>

          <View style={styles.card}>
            <Text style={styles.title}>Entrar no Cinema</Text>

            {error ? (
              <View style={styles.alertError}>
                <Text style={styles.alertErrorText}>{error}</Text>
              </View>
            ) : null}

            <Input
              label="E-mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              error={fieldErrors.email}
              editable={!loading}
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={fieldErrors.password}
              editable={!loading}
            />

            <Button
              title="Entrar"
              loading={loading}
              onPress={handleLogin}
            />

            <TouchableOpacity
              style={styles.footerLink}
              onPress={() => navigation.navigate('Register')}
              disabled={loading}
            >
              <Text style={styles.footerText}>
                Não tem uma conta?{' '}
                <Text style={styles.footerHighlight}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.apiInfo}>API: {API_BASE_URL}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
