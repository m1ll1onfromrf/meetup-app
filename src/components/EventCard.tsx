import { Event } from '@/types';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.type}>{event.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  type: {
    marginTop: 4,
    color: '#666',
  },
});
