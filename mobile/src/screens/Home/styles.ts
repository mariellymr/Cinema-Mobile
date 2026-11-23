import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  brand: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '800',
  },
  roleBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  greeting: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  email: {
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },
  statusText: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
});
