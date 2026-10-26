import { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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
  const [items, setItems] = useState<Item[]>(STARTER_ITEMS);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');

  const canAdd = title.trim() !== '' && place.trim() !== '';

  function addItem() {
    if (!canAdd) return;

    const newItem: Item = {
      id: Date.now().toString(),
      title: title.trim(),
      place: place.trim(),
    };

    setItems([newItem, ...items]);
    setTitle('');
    setPlace('');
  }

  function handleLongPress(item: Item) {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Remove "${item.title}" from reported items?`);
      if (confirmed) {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
      }
    } else {
      Alert.alert(
        'Remove Item',
        `Do you want to remove "${item.title}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => setItems((prev) => prev.filter((i) => i.id !== item.id)),
          },
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.count}>📦 {items.length} items reported</Text>
          {items.length > 0 && (
            <Text style={styles.hint}>Long-press an item to remove</Text>
          )}
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="What did you find?"
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Where?"
            placeholderTextColor="#94a3b8"
            value={place}
            onChangeText={setPlace}
          />
          <Pressable
            style={[styles.button, !canAdd && styles.buttonDisabled]}
            onPress={addItem}
            disabled={!canAdd}
          >
            <Text style={styles.buttonText}>+ Add item</Text>
          </Pressable>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onLongPress={() => handleLongPress(item)}
              style={({ pressed }) => pressed && styles.pressedCard}
            >
              <ItemCard title={item.title} place={item.place} />
            </Pressable>
          )}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nothing reported yet</Text>
              <Text style={styles.emptySubtitle}>Found something? Add it using the form above.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    padding: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  count: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
  hint: {
    color: '#94a3b8',
    fontSize: 12,
    fontStyle: 'italic',
  },
  form: {
    gap: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0f172a',
  },
  button: {
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.45,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  separator: {
    height: 12,
  },
  pressedCard: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 36,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#94a3b8',
  },
});
