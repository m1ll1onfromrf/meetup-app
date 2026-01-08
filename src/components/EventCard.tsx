import { Event } from '@/types';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  event: Event;
  onPress?: () => void;
};

export function EventCard({ event, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={{ padding: 12 }}>
      <Text>{event.title}</Text>
      <Text>{event.type}</Text>
    </Pressable>
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
