import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { IngressoDetalhado } from '../../models/Ingresso';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface IngressoCardProps {
  ingresso: IngressoDetalhado;
}

export const IngressoCard = ({ ingresso }: IngressoCardProps) => {
  const sessaoData = ingresso.sessao?.dataHora
    ? new Date(ingresso.sessao.dataHora).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : `Sessão #${ingresso.sessaoId}`;

  const dataVenda = new Date(ingresso.dataVenda).toLocaleDateString('pt-BR');

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.filmeTitle}>
          {ingresso.sessao?.filme?.titulo ?? `Sessão #${ingresso.sessaoId}`}
        </Text>
        <View style={styles.seatBadge}>
          <Text style={styles.seatText}>Assento {ingresso.assento}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={14} color={colors.accent} />
        <Text style={styles.infoText}>{sessaoData}</Text>
      </View>

      {ingresso.sessao?.sala ? (
        <View style={styles.infoRow}>
          <Ionicons name="tv-outline" size={14} color={colors.accent} />
          <Text style={styles.infoText}>
            {ingresso.sessao.sala.nome} ({ingresso.sessao.sala.tipo})
          </Text>
        </View>
      ) : null}

      <View style={styles.infoRow}>
        <Ionicons name="person-outline" size={14} color={colors.accent} />
        <Text style={styles.infoText}>
          {ingresso.nomeCliente} • CPF: {ingresso.cpfCliente}
        </Text>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.paymentBadge}>
          <Text style={styles.paymentText}>{ingresso.tipoPagamento}</Text>
        </View>
        <Text style={styles.dateText}>Comprado em {dataVenda}</Text>
      </View>
    </View>
  );
};
