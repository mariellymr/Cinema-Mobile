import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    paddingHorizontal: 20,
    width: 'auto',
  },
});
