import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button } from '../../components/Button';
import { FilmeCard } from '../../components/FilmeCard';
import { useAuth } from '../../contexts/AuthContext';
import type { Filme } from '../../models/Filme';
import type { AppTabParamList } from '../../navigation/AppNavigator';
import { filmesService } from '../../services/filmesService';
import { colors } from '../../theme/colors';
import { styles } from './styles';

type Props = BottomTabScreenProps<AppTabParamList, 'Filmes'>;

export const FilmesScreen = ({ navigation }: Props) => {
  const { user, logout } = useAuth();
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const carregarFilmes = useCallback(async (isRefresh = false) => {
    try {
      setError('');
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const dados = await filmesService.listar();
      setFilmes(dados);
    } catch {
      setError('Não foi possível carregar os filmes. Puxe para tentar novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void carregarFilmes();
  }, [carregarFilmes]);

  const filmesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return filmes;
    return filmes.filter(
      (f) =>
        f.titulo.toLowerCase().includes(termo) ||
        f.genero.toLowerCase().includes(termo),
    );
  }, [filmes, busca]);

  const handleVerSessoes = (filme: Filme) => {
    navigation.navigate('Sessoes', {
      filmeId: filme.id,
      filmeTitulo: filme.titulo,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>Lumière</Text>
          <Text style={styles.greeting}>Olá, {user?.name}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={16} color={colors.text} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por título ou gênero..."
          placeholderTextColor={colors.textMuted}
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 ? (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
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
            onPress={() => carregarFilmes()}
          />
        </View>
      ) : (
        <FlatList
          data={filmesFiltrados}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => carregarFilmes(true)}
              tintColor={colors.accent}
            />
          }
          renderItem={({ item }) => (
            <FilmeCard filme={item} onVerSessoes={handleVerSessoes} />
          )}
          ListEmptyComponent={
            <View style={styles.centerBox}>
              <Ionicons
                name="film-outline"
                size={44}
                color={colors.textMuted}
              />
              <Text style={styles.emptyText}>Nenhum filme encontrado.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};
