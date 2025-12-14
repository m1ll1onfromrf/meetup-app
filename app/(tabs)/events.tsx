import type { LocationObject } from 'expo-location';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Try to require react-native-maps — if it's not available in Expo Go, we'll show a placeholder.
let MapView: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  MapView = require('react-native-maps').default;
} catch (e) {
  MapView = null;
}

export default function EventsMapScreen() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);
        Alert.alert('Геолокация', 'Разрешение получено успешно!');

      } catch (error) {
        setErrorMsg('Failed to get location');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Карта мероприятий</Text>
      {location && (
        <Text style={styles.subtitle}>
          Ваше местоположение: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
        </Text>
      )}

      {MapView ? (
        <MapView style={styles.mapPlaceholder} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Карта будет здесь</Text>
          <Text style={styles.placeholderText}>временно отключена для отладки в Expo Go</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.testButton}
        onPress={() => router.push('/event/1')}
      >
        <Text style={styles.testButtonText}>Тест: открыть мероприятие #1</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
  },
  placeholder: {
    width: '90%',
    height: 300,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  placeholderText: {
    color: '#64748b',
    fontSize: 18,
  },
  mapPlaceholder: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#e6eef8',
    marginVertical: 20,
  },
  testButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  testButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});