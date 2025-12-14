import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const handleJoin = () => {
    Alert.alert('Успешно!', `Вы присоединились к мероприятию #${id}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мероприятие #{id}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Детали мероприятия</Text>
        <Text style={styles.cardText}>Дата: 15 декабря 2025</Text>
        <Text style={styles.cardText}>Время: 19:00</Text>
        <Text style={styles.cardText}>Участники: 8 человек</Text>
        <Text style={styles.cardText}>Место: Центральный парк</Text>
      </View>

      <Button
        title="Присоединиться к мероприятию"
        onPress={handleJoin}
        color="#007AFF"
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Назад к карте</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1e293b',
  },
  card: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1e293b',
  },
  cardText: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 8,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: '500',
  },
});