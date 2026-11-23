import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardUnread: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.accent,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  title: {
    flex: 1,
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  newBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newBadgeText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  message: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
  },
  date: {
    color: colors.textMuted,
    fontSize: 11,
  },
});
