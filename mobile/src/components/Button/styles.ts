import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  labelOutline: {
    color: colors.textMuted,
  },
});
