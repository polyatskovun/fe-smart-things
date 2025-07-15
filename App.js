import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddItemScreen from './screens/AddItemScreen';
import DeviceScreen from './screens/DeviceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  const saveItems = async () => {
    const payload = { items };
    console.log('Підготовка до відправки:', payload);
    try {
      const response = await fetch('https://example.com/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('Відповідь сервера (status):', response.status);
    } catch (error) {
      console.error('Помилка під час відправки даних:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Увійти' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Реєстрація' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Головна' }} />
        <Stack.Screen name="Settings">
          {(props) => (
            <SettingsScreen
              {...props}
              items={items}
              saveItems={saveItems}
              removeItem={(id) => setItems((prev) => prev.filter((it) => it.id !== id))}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddItem">
          {(props) => <AddItemScreen {...props} addItem={addItem} />}
        </Stack.Screen>
        <Stack.Screen name="Device" component={DeviceScreen} options={{ title: 'Bluetooth пристрої' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
