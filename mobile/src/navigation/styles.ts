import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
  },
});
