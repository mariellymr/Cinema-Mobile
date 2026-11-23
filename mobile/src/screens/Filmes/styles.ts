import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brand: {
    color: colors.accent,
    fontSize: 26,
    fontWeight: '800',
  },
  greeting: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 20,
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
