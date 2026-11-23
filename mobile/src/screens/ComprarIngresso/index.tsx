import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';
import {
  COMBOS_LANCHES,
  FORMAS_PAGAMENTO,
  type ComboLanche,
} from '../../models/Ingresso';
import type { AppStackParamList } from '../../navigation/AppNavigator';
import { ingressosService } from '../../services/ingressosService';
import { colors } from '../../theme/colors';
import { styles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'ComprarIngresso'>;

const formatBRL = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const ComprarIngressoScreen = ({ route, navigation }: Props) => {
  const { sessao } = route.params;
  const { user } = useAuth();

  const [nomeCliente, setNomeCliente] = useState(user?.name ?? '');
  const [cpfCliente, setCpfCliente] = useState('');
  const [assento, setAssento] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState<string>(
    FORMAS_PAGAMENTO[0],
  );
  const [combo, setCombo] = useState<ComboLanche>(COMBOS_LANCHES[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const valorTotal = Number(sessao.preco) + combo.preco;

  const dataFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleConfirmar = async () => {
    setError('');

    if (!nomeCliente.trim() || !cpfCliente.trim() || !assento.trim()) {
      setError('Preencha Nome, CPF e Assento para continuar.');
      return;
    }

    setLoading(true);
    try {
      await ingressosService.criar({
        nomeCliente: nomeCliente.trim(),
        cpfCliente: cpfCliente.trim(),
        assento: assento.trim().toUpperCase(),
        tipoPagamento:
          combo.preco > 0
            ? `${tipoPagamento} (+ ${combo.nome})`
            : tipoPagamento,
        sessaoId: sessao.id,
        userId: user?.id,
      });

      Alert.alert(
        'Compra confirmada!',
        `Filme: ${sessao.filme?.titulo ?? `Sessão #${sessao.id}`}\nAssento: ${assento.trim().toUpperCase()}\nCombo: ${combo.nome}\nTotal: ${formatBRL(valorTotal)}`,
        [
          {
            text: 'Ver Meus Ingressos',
            onPress: () =>
              navigation.navigate('MainTabs', { screen: 'MeusIngressos' }),
          },
        ],
      );
    } catch {
      setError('Não foi possível finalizar a compra. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Comprar Ingresso</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>
              {sessao.filme?.titulo ?? `Filme #${sessao.filmeId}`}
            </Text>
            <Text style={styles.summaryText}>Horário: {dataFormatada}</Text>
            <Text style={styles.summaryText}>
              Sala: {sessao.sala?.nome ?? `#${sessao.salaId}`} • {sessao.idioma}{' '}
              • {sessao.formato}
            </Text>
            <Text style={styles.summaryText}>
              Ingresso: {formatBRL(Number(sessao.preco))}
            </Text>
          </View>

          {error ? (
            <View style={styles.alertError}>
              <Text style={styles.alertErrorText}>{error}</Text>
            </View>
          ) : null}

          <Text style={styles.sectionTitle}>Dados do Cliente</Text>

          <Input
            label="Nome do Cliente"
            placeholder="Nome completo"
            value={nomeCliente}
            onChangeText={setNomeCliente}
            editable={!loading}
          />

          <Input
            label="CPF"
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={cpfCliente}
            onChangeText={setCpfCliente}
            editable={!loading}
          />

          <Input
            label="Assento"
            placeholder="Ex: A10"
            autoCapitalize="characters"
            value={assento}
            onChangeText={setAssento}
            editable={!loading}
          />

          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          <View style={styles.optionsRow}>
            {FORMAS_PAGAMENTO.map((forma) => {
              const selected = tipoPagamento === forma;
              return (
                <TouchableOpacity
                  key={forma}
                  style={[
                    styles.paymentChip,
                    selected && styles.paymentChipSelected,
                  ]}
                  onPress={() => setTipoPagamento(forma)}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.paymentChipText,
                      selected && styles.paymentChipTextSelected,
                    ]}
                  >
                    {forma}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Combos de Lanches</Text>
          {COMBOS_LANCHES.map((item) => {
            const selected = combo.id === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.comboCard, selected && styles.comboCardSelected]}
                onPress={() => setCombo(item)}
                disabled={loading}
              >
                <View style={styles.comboInfo}>
                  <Text style={styles.comboName}>{item.nome}</Text>
                  <Text style={styles.comboDesc}>{item.descricao}</Text>
                </View>
                <Text style={styles.comboPrice}>
                  {item.preco === 0 ? 'Grátis' : `+ ${formatBRL(item.preco)}`}
                </Text>
              </TouchableOpacity>
            );
          })}

          <View style={styles.totalCard}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Ingresso</Text>
              <Text style={styles.totalValue}>
                {formatBRL(Number(sessao.preco))}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Combo ({combo.nome})</Text>
              <Text style={styles.totalValue}>{formatBRL(combo.preco)}</Text>
            </View>
            <View style={styles.totalDivider} />
            <View style={styles.totalRow}>
              <Text style={styles.finalLabel}>Total</Text>
              <Text style={styles.finalValue}>{formatBRL(valorTotal)}</Text>
            </View>
          </View>

          <Button
            title={`Confirmar Compra • ${formatBRL(valorTotal)}`}
            loading={loading}
            onPress={handleConfirmar}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
