import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddItemScreen({ navigation, addItem }) {
  const [number, setNumber] = useState('1');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  });
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    const num = parseInt(number, 10);
    if (isNaN(num) || num < 1 || num > 50) {
      Alert.alert('Помилка', 'Введіть число від 1 до 50');
      return;
    }
    const newItem = { id: Date.now(), number: num, time: date.getTime() };
    addItem(newItem);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Число (1–50):</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
        placeholder="1"
      />
      <Text style={styles.label}>Час:</Text>
      <TouchableOpacity style={styles.timeButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.timeButtonText}>{date.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.spacer} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Зберегти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 16, marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8, width: '60%', borderRadius: 6, textAlign: 'center' },
  timeButton: { backgroundColor: '#2196F3', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8, marginVertical: 8, minWidth: 120 },
  timeButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  spacer: { height: 16 },
  saveButton: { backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginTop: 24 },
  saveButtonText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});