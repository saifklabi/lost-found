import { FlatList, StyleSheet, View } from 'react-native';

import ItemCard from '@/components/ItemCard';
import { Item } from '@/types';

const STARTER_ITEMS: Item[] = [
  { id: '1', title: 'Blue water bottle', place: 'Library, 2nd floor' },
  { id: '2', title: 'Student card', place: 'Cafeteria' },
  { id: '3', title: 'USB-C charger', place: 'Room B12' },
];

function Separator() {
  return <View style={styles.separator} />;
}

export default function Index() {
  return (
    <View style={styles.screen}>
      <FlatList
        data={STARTER_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard title={item.title} place={item.place} />}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  separator: {
    height: 10,
  },
});
