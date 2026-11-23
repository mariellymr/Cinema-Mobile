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
import type { AuthStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = { name: '', email: '', password: '' };
    let valid = true;

    if (!name.trim()) {
      next.name = 'O nome completo é obrigatório.';
      valid = false;
    }

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
    } else if (password.length < 6) {
      next.password = 'A senha deve ter no mínimo 6 caracteres.';
      valid = false;
    }

    setFieldErrors(next);
    return valid;
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    if (!validate()) return;

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.ok) {
      setSuccess('Conta criada com sucesso! Redirecionando para o login...');
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);
    } else {
      setError(result.message || 'Erro ao criar conta.');
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
          <Text style={styles.subtitle}>Crie sua conta para comprar ingressos</Text>

          <View style={styles.card}>
            <Text style={styles.title}>Criar Conta</Text>

            {error ? (
              <View style={styles.alertError}>
                <Text style={styles.alertErrorText}>{error}</Text>
              </View>
            ) : null}

            {success ? (
              <View style={styles.alertSuccess}>
                <Text style={styles.alertSuccessText}>{success}</Text>
              </View>
            ) : null}

            <Input
              label="Nome Completo"
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
              error={fieldErrors.name}
              editable={!loading}
            />

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
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={fieldErrors.password}
              editable={!loading}
            />

            <Button
              title="Cadastrar-se"
              loading={loading}
              onPress={handleRegister}
            />

            <TouchableOpacity
              style={styles.footerLink}
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={styles.footerText}>
                Já tem uma conta?{' '}
                <Text style={styles.footerHighlight}>Entrar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
