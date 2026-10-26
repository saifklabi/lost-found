import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  place: string;
};

export default function ItemCard({ title, place }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.place}>📍 {place}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderLeftWidth: 5,
    borderLeftColor: '#4f46e5',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  place: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});
