import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SettingsScreen({ navigation, items, saveItems, removeItem }) {
  const [isDirty, setIsDirty] = useState(false);
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setIsDirty(true);
    }
  }, [items]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddItem')} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const confirmDelete = (id) => {
    Alert.alert(
      'Підтвердження',
      'Ви впевнені, що хочете видалити цей запис?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити', style: 'destructive', onPress: () => removeItem(id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text>Число: {item.number}</Text>
        <Text>Час: {new Date(item.time).toLocaleTimeString()}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text>Немає елементів</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      {isDirty && (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            saveItems();
            setIsDirty(false);
            navigation.popToTop();
          }}
        >
          <Text style={styles.saveButtonText}>зберегти</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  headerButton: { marginRight: 16 },
  headerButtonText: { fontSize: 24, fontWeight: 'bold' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  deleteButton: { padding: 4 },
  deleteButtonText: { fontSize: 18, color: 'red', fontWeight: 'bold' },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});