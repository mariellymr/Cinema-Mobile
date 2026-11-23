import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 14,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 46,
    borderRadius: 8,
    backgroundColor: colors.surfaceLight,
    color: colors.text,
    paddingHorizontal: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: colors.primary,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
