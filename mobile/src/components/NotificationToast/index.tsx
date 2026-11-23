import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNotificacoes } from '../../contexts/NotificacoesContext';
import { colors } from '../../theme/colors';
import { styles } from './styles';

export const NotificationToast = () => {
  const { toastAtual, fecharToast } = useNotificacoes();

  if (!toastAtual) return null;

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.toast}>
        <Ionicons name="notifications" size={22} color={colors.accent} />
        <View style={styles.content}>
          <Text style={styles.title}>{toastAtual.titulo}</Text>
          <Text style={styles.message}>{toastAtual.mensagem}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={fecharToast}>
          <Ionicons name="close" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
