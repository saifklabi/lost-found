import { StyleSheet, View } from 'react-native';

import ItemCard from '@/components/ItemCard';

export default function Index() {
  return (
    <View style={styles.container}>
      <ItemCard title="Blue water bottle" place="Library, 2nd floor" />
      <ItemCard title="Student card" place="Cafeteria" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
    gap: 10,
  },
});
