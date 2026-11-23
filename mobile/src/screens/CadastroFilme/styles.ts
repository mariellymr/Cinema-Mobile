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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 12,
    marginTop: 2,
  },
  adminBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  adminBadgeText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 36,
  },
  sectionLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.background,
    fontWeight: '800',
  },
  multilineInput: {
    height: 90,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  alertError: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  alertErrorText: {
    color: colors.danger,
    fontSize: 13,
    textAlign: 'center',
  },
});
