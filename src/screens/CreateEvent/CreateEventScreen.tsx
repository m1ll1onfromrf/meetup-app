import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateEvent = async () => {
    try {
      setIsLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Нужен доступ к геолокации');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Имитация создания события — позже заменить на реальный запрос к API
      console.log('Создание события:', { title, description, latitude, longitude });

      Alert.alert('Успех!', 'Встреча создана');
      router.back();

    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Ошибка', 'Не удалось создать встречу');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новая встреча</Text>

      <TextInput
        style={styles.input}
        placeholder="Название"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Описание"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#999"
        textAlignVertical="top"
      />

      <Button
        title={isLoading ? "Создание..." : "Создать встречу"}
        onPress={handleCreateEvent}
        disabled={isLoading || !title}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1e293b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});