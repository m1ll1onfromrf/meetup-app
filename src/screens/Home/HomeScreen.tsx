// mobile/app/(tabs)/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MeetUp</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/create')}
      >
        <Text style={styles.buttonText}>Создать встречу</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/events')}
      >
        <Text style={styles.buttonText}>Найти мероприятия</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Экран домашний — можно нажать кнопки</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 10,
    width: 240,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    marginTop: 24,
    color: '#666',
    textAlign: 'center',
  },
});