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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  topBarTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 36,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  summaryTitle: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  summaryText: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 3,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  paymentChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  paymentChipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  paymentChipTextSelected: {
    color: colors.text,
  },
  comboCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  comboCardSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceLight,
  },
  comboInfo: {
    flex: 1,
    marginRight: 10,
  },
  comboName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  comboDesc: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  comboPrice: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  totalCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  totalValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  totalDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  finalLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  finalValue: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '800',
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
