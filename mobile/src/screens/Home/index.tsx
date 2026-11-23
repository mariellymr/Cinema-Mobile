import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../services/api';
import { styles } from './styles';

export const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={styles.brand}>Lumière</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{user?.role || 'USER'}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.greeting}>Olá, {user?.name}!</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <View style={styles.divider} />

            <Text style={styles.statusText}>
              Conectado à API: {API_BASE_URL}
            </Text>
            <Text style={styles.hint}>
              Etapa 1 concluída (Autenticação + Navegação). Próximas etapas:
              Filmes, Sessões, Compra de Ingressos/Combos e Notificações via
              Kafka.
            </Text>
          </View>
        </View>

        <Button title="Sair da conta" variant="outline" onPress={logout} />
      </View>
    </SafeAreaView>
  );
};
