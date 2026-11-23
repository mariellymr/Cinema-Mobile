import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { IngressoCard } from '../../components/IngressoCard';
import { useAuth } from '../../contexts/AuthContext';
import type { IngressoDetalhado } from '../../models/Ingresso';
import { ingressosService } from '../../services/ingressosService';
import { colors } from '../../theme/colors';
import { styles } from './styles';

export const MeusIngressosScreen = () => {
  const { user } = useAuth();
  const [ingressos, setIngressos] = useState<IngressoDetalhado[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const carregar = useCallback(
    async (isRefresh = false) => {
      try {
        setError('');
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }
        const dados = await ingressosService.listarDetalhados(
          user?.id,
          user?.role === 'ADMIN',
        );
        setIngressos(dados);
      } catch {
        setError('Não foi possível carregar os ingressos.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user?.id, user?.role],
  );

  useFocusEffect(
    useCallback(() => {
      void carregar();
    }, [carregar]),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {user?.role === 'ADMIN' ? 'Ingressos Vendidos' : 'Meus Ingressos'}
        </Text>
        <Text style={styles.subtitle}>
          Histórico de compras e assentos reservados
        </Text>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : error ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Tentar novamente"
            style={styles.retryButton}
            onPress={() => carregar()}
          />
        </View>
      ) : (
        <FlatList
          data={ingressos}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => carregar(true)}
              tintColor={colors.accent}
            />
          }
          renderItem={({ item }) => <IngressoCard ingresso={item} />}
          ListEmptyComponent={
            <View style={styles.centerBox}>
              <Ionicons
                name="ticket-outline"
                size={44}
                color={colors.textMuted}
              />
              <Text style={styles.emptyText}>
                Você ainda não comprou nenhum ingresso.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};
