import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { SessaoDetalhada } from '../../models/Sessao';
import { colors } from '../../theme/colors';
import { Button } from '../Button';
import { styles } from './styles';

interface SessaoCardProps {
  sessao: SessaoDetalhada;
  onComprar: (sessao: SessaoDetalhada) => void;
}

export const SessaoCard = ({ sessao, onComprar }: SessaoCardProps) => {
  const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const precoFormatado = sessao.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.filmeTitle}>
          {sessao.filme?.titulo ?? `Filme #${sessao.filmeId}`}
        </Text>
        <Text style={styles.priceText}>{precoFormatado}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={14} color={colors.accent} />
        <Text style={styles.infoText}>{dataFormatada}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="tv-outline" size={14} color={colors.accent} />
        <Text style={styles.infoText}>
          {sessao.sala
            ? `${sessao.sala.nome} (${sessao.sala.tipo} • ${sessao.sala.capacidade} lugares)`
            : `Sala #${sessao.salaId}`}
        </Text>
      </View>

      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{sessao.idioma}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{sessao.formato}</Text>
        </View>
        {sessao.filme?.classificacaoIndicativa ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {sessao.filme.classificacaoIndicativa}
            </Text>
          </View>
        ) : null}
      </View>

      <Button
        title="Comprar Ingresso"
        style={styles.buyButton}
        onPress={() => onComprar(sessao)}
      />
    </View>
  );
};
