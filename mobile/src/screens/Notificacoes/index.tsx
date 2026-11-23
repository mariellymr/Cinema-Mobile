import React, { useState } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NotificacaoCard } from '../../components/NotificacaoCard';
import { useNotificacoes } from '../../contexts/NotificacoesContext';
import { colors } from '../../theme/colors';
import { styles } from './styles';

export const NotificacoesScreen = () => {
  const {
    notificacoes,
    naoLidas,
    recarregar,
    marcarComoLida,
    marcarTodasComoLidas,
  } = useNotificacoes();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await recarregar();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notificações</Text>
          <Text style={styles.subtitle}>
            Novos filmes recebidos via Kafka
          </Text>
        </View>

        {naoLidas > 0 ? (
          <TouchableOpacity
            style={styles.readAllButton}
            onPress={() => void marcarTodasComoLidas()}
          >
            <Text style={styles.readAllText}>Ler todas</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={notificacoes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
          />
        }
        renderItem={({ item }) => (
          <NotificacaoCard
            notificacao={item}
            onPress={(id) => void marcarComoLida(id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.centerBox}>
            <Ionicons
              name="notifications-off-outline"
              size={44}
              color={colors.textMuted}
            />
            <Text style={styles.emptyText}>
              Nenhuma notificação de novo filme ainda.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};
