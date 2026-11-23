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
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  filmeTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  priceText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  infoText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
    marginBottom: 14,
  },
  badge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  buyButton: {
    height: 40,
    marginTop: 0,
  },
});
