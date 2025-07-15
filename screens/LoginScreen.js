import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '<YOUR_EXPO_CLIENT_ID>',
    iosClientId: '<YOUR_IOS_CLIENT_ID>',
    androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
    webClientId: '<YOUR_WEB_CLIENT_ID>',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      Alert.alert('Успіх', 'Успішна автентифікація через Google');
      navigation.replace('Home');
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Помилка', 'Введіть, будь ласка, email та пароль');
      return;
    }
    try {
      const res = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        Alert.alert('Успіх', 'Ви успішно увійшли');
        navigation.replace('Home');
      } else {
        const err = await res.json();
        Alert.alert('Помилка', err.message || 'Не вдалося увійти');
      }
    } catch (error) {
      Alert.alert('Помилка', 'Сталася помилка мережі');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Увійти</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>
      <Text style={styles.or}>або</Text>
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Увійти через Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.switchText}>Немає акаунта? Зареєструватися</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  googleButton: { backgroundColor: '#DB4437' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  or: { textAlign: 'center', marginVertical: 8, fontSize: 16 },
  switchText: { textAlign: 'center', color: '#2196F3', marginTop: 16, fontSize: 16 },
});