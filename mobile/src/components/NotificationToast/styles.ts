import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    zIndex: 999,
  },
  toast: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    elevation: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  message: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
  },
  closeButton: {
    padding: 2,
  },
});
