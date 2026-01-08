import { Event } from '@/types';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  event: Event | undefined;
};

export default function EventDetailsScreen({ event }: Props) {
  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Событие не найдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>Тип: {event.type}</Text>
      <Text>Широта: {event.lat}</Text>
      <Text>Долгота: {event.lng}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
});
