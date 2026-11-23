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
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useNotificacoes } from '../../contexts/NotificacoesContext';
import { filmesService } from '../../services/filmesService';
import { styles } from './styles';

const CLASSIFICACOES = ['Livre', '10', '12', '14', '16', '18'];

function parseDataEstreia(input: string): string | null {
  const limpo = input.trim();
  const brMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(limpo);
  if (brMatch) {
    const [, dia, mes, ano] = brMatch;
    const iso = `${ano}-${mes}-${dia}T00:00:00.000Z`;
    return Number.isNaN(Date.parse(iso)) ? null : iso;
  }
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(limpo);
  if (isoMatch) {
    const iso = `${limpo}T00:00:00.000Z`;
    return Number.isNaN(Date.parse(iso)) ? null : iso;
  }
  return null;
}

export const CadastroFilmeScreen = () => {
  const { recarregar } = useNotificacoes();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [genero, setGenero] = useState('');
  const [classificacao, setClassificacao] = useState('Livre');
  const [duracao, setDuracao] = useState('');
  const [dataEstreia, setDataEstreia] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastrar = async () => {
    setError('');

    const duracaoNum = parseInt(duracao, 10);
    const dataIso = parseDataEstreia(dataEstreia);

    if (!titulo.trim() || !descricao.trim() || !genero.trim()) {
      setError('Preencha título, descrição e gênero.');
      return;
    }

    if (Number.isNaN(duracaoNum) || duracaoNum < 1) {
      setError('Informe uma duração válida em minutos (ex: 120).');
      return;
    }

    if (!dataIso) {
      setError('Informe a data de estreia no formato DD/MM/AAAA (ex: 25/12/2026).');
      return;
    }

    setLoading(true);
    try {
      await filmesService.criar({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        genero: genero.trim(),
        classificacaoIndicativa: classificacao,
        duracaoMinutos: duracaoNum,
        dataEstreia: dataIso,
      });

      setTitulo('');
      setDescricao('');
      setGenero('');
      setClassificacao('Livre');
      setDuracao('');
      setDataEstreia('');

      // Atualiza as notificações para refletir o evento publicado no Kafka
      setTimeout(() => {
        void recarregar();
      }, 1000);

      Alert.alert(
        'Filme cadastrado!',
        'O filme foi salvo e o evento foi publicado no Kafka para notificar os usuários.',
      );
    } catch {
      setError('Não foi possível cadastrar o filme. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Cadastrar Filme</Text>
          <Text style={styles.subtitle}>
            Publica automaticamente notificação no Kafka
          </Text>
        </View>
        <View style={styles.adminBadge}>
          <Text style={styles.adminBadgeText}>ADMIN</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {error ? (
            <View style={styles.alertError}>
              <Text style={styles.alertErrorText}>{error}</Text>
            </View>
          ) : null}

          <Input
            label="Título"
            placeholder="Ex: Duna: Parte 3"
            value={titulo}
            onChangeText={setTitulo}
            editable={!loading}
          />

          <Input
            label="Descrição"
            placeholder="Sinopse do filme..."
            multiline
            numberOfLines={3}
            style={styles.multilineInput}
            value={descricao}
            onChangeText={setDescricao}
            editable={!loading}
          />

          <Input
            label="Gênero"
            placeholder="Ex: Ficção Científica, Ação, Comédia"
            value={genero}
            onChangeText={setGenero}
            editable={!loading}
          />

          <Text style={styles.sectionLabel}>Classificação Indicativa</Text>
          <View style={styles.chipsRow}>
            {CLASSIFICACOES.map((item) => {
              const selected = classificacao === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => setClassificacao(item)}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Input
            label="Duração (minutos)"
            placeholder="Ex: 140"
            keyboardType="numeric"
            value={duracao}
            onChangeText={setDuracao}
            editable={!loading}
          />

          <Input
            label="Data de Estreia (DD/MM/AAAA)"
            placeholder="Ex: 25/12/2026"
            value={dataEstreia}
            onChangeText={setDataEstreia}
            editable={!loading}
          />

          <Button
            title="Cadastrar Filme"
            loading={loading}
            onPress={handleCadastrar}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
