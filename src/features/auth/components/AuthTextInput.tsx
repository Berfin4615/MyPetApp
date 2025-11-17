// src/features/auth/components/AuthTextInput.tsx
import { TextInput, StyleSheet, Text, View, TextInputProps } from 'react-native';
import { colors, spacing } from '../../../shared/styles/theme';

type Props = TextInputProps & {
  label: string;
};

export default function AuthTextInput({ label, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.muted}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 14,
  },
});
