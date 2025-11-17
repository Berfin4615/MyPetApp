import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles/theme';

type Props = {
  label: string;
  onPress?: () => void;
};

export default function PrimaryButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 16,
  },
  text: {
    color: colors.background,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});
