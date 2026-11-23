import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Filme } from '../../models/Filme';
import { colors } from '../../theme/colors';
import { Button } from '../Button';
import { styles } from './styles';

interface FilmeCardProps {
  filme: Filme;
  onVerSessoes: (filme: Filme) => void;
}

export const FilmeCard = ({ filme, onVerSessoes }: FilmeCardProps) => {
  const estreia = new Date(filme.dataEstreia).toLocaleDateString('pt-BR');

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{filme.titulo}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{filme.classificacaoIndicativa}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaChip}>
          <Ionicons name="pricetag-outline" size={12} color={colors.accent} />
          <Text style={styles.metaText}>{filme.genero}</Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="time-outline" size={12} color={colors.accent} />
          <Text style={styles.metaText}>{filme.duracaoMinutos} min</Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="calendar-outline" size={12} color={colors.accent} />
          <Text style={styles.metaText}>Estreia: {estreia}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {filme.descricao}
      </Text>

      <Button
        title="Ver Sessões"
        style={styles.actionButton}
        onPress={() => onVerSessoes(filme)}
      />
    </View>
  );
};
