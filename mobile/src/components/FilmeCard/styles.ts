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
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  ratingBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  actionButton: {
    height: 40,
    marginTop: 0,
  },
});
