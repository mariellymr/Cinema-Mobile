import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  filmeTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  seatBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  seatText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  infoText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  paymentBadge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  paymentText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  dateText: {
    color: colors.textMuted,
    fontSize: 11,
  },
});
