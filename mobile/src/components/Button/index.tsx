import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  type TouchableOpacityProps,
} from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'outline';
}

export const Button = ({
  title,
  loading = false,
  variant = 'primary',
  disabled,
  style,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.button,
        variant === 'outline' && styles.buttonOutline,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'outline' && styles.labelOutline,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
