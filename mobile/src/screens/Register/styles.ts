import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  brand: {
    color: colors.accent,
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 28,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  alertError: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  alertErrorText: {
    color: colors.danger,
    fontSize: 13,
    textAlign: 'center',
  },
  alertSuccess: {
    backgroundColor: colors.successBg,
    borderColor: colors.success,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  alertSuccessText: {
    color: colors.success,
    fontSize: 13,
    textAlign: 'center',
  },
  footerLink: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  footerHighlight: {
    color: colors.accent,
    fontWeight: '700',
  },
});
