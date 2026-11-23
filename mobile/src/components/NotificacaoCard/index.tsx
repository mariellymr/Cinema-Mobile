import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Notificacao } from '../../models/Notificacao';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface NotificacaoCardProps {
  notificacao: Notificacao;
  onPress: (id: number) => void;
}

export const NotificacaoCard = ({
  notificacao,
  onPress,
}: NotificacaoCardProps) => {
  const dataFormatada = new Date(notificacao.criadaEm).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, !notificacao.lida && styles.cardUnread]}
      onPress={() => {
        if (!notificacao.lida) {
          onPress(notificacao.id);
        }
      }}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Ionicons name="film-outline" size={16} color={colors.accent} />
          <Text style={styles.title}>{notificacao.titulo}</Text>
        </View>
        {!notificacao.lida ? (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>Novo</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.message}>{notificacao.mensagem}</Text>
      <Text style={styles.date}>{dataFormatada}</Text>
    </TouchableOpacity>
  );
};
