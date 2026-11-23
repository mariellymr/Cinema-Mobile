import React from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input = ({ label, error, style, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};
