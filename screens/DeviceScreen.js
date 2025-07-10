import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function DeviceScreen() {
  const [devices, setDevices] = useState([]);

  const scanDevices = () => {
    // TODO: реалізувати сканування Bluetooth-пристроїв
    Alert.alert('Сканування', 'Почато сканування Bluetooth-пристроїв...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth пристрої</Text>
      <TouchableOpacity style={styles.scanButton} onPress={scanDevices}>
        <Text style={styles.scanButtonText}>Сканувати пристрої</Text>
      </TouchableOpacity>
      {/* Тут буде список знайдених пристроїв */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});