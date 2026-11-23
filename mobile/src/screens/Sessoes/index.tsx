import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../../components/Button';
import { SessaoCard } from '../../components/SessaoCard';
import type { SessaoDetalhada } from '../../models/Sessao';
import type {
  AppStackParamList,
  AppTabParamList,
} from '../../navigation/AppNavigator';
import { sessoesService } from '../../services/sessoesService';
import { colors } from '../../theme/colors';
import { styles } from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'Sessoes'>,
  NativeStackScreenProps<AppStackParamList>
>;

export const SessoesScreen = ({ route, navigation }: Props) => {
  const filmeIdFiltro = route.params?.filmeId;
  const filmeTituloFiltro = route.params?.filmeTitulo;

  const [sessoes, setSessoes] = useState<SessaoDetalhada[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const carregarSessoes = useCallback(async (isRefresh = false) => {
    try {
      setError('');
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const dados = await sessoesService.listarDetalhadas();
      setSessoes(dados);
    } catch {
      setError('Não foi possível carregar as sessões. Tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void carregarSessoes();
  }, [carregarSessoes]);

  const sessoesFiltradas = useMemo(() => {
    if (!filmeIdFiltro) return sessoes;
    return sessoes.filter((s) => s.filmeId === filmeIdFiltro);
  }, [sessoes, filmeIdFiltro]);

  const limparFiltro = () => {
    navigation.setParams({ filmeId: undefined, filmeTitulo: undefined });
  };

  const handleComprar = (sessao: SessaoDetalhada) => {
    navigation.navigate('ComprarIngresso', { sessao });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Sessões Disponíveis</Text>
        <Text style={styles.subtitle}>
          Escolha um horário para garantir seu ingresso
        </Text>
      </View>

      {filmeIdFiltro ? (
        <View style={styles.filterBar}>
          <Text style={styles.filterText} numberOfLines={1}>
            Filtrando: {filmeTituloFiltro ?? `Filme #${filmeIdFiltro}`}
          </Text>
          <TouchableOpacity style={styles.clearButton} onPress={limparFiltro}>
            <Ionicons name="close-circle" size={16} color={colors.text} />
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      ) : null}

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
            onPress={() => carregarSessoes()}
          />
        </View>
      ) : (
        <FlatList
          data={sessoesFiltradas}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => carregarSessoes(true)}
              tintColor={colors.accent}
            />
          }
          renderItem={({ item }) => (
            <SessaoCard sessao={item} onComprar={handleComprar} />
          )}
          ListEmptyComponent={
            <View style={styles.centerBox}>
              <Ionicons
                name="calendar-outline"
                size={44}
                color={colors.textMuted}
              />
              <Text style={styles.emptyText}>
                Nenhuma sessão disponível
                {filmeIdFiltro ? ' para este filme.' : '.'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};
