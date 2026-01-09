import { useEvents } from '@/context';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  eventId: string;
};

export default function EventDetailsScreen({ eventId }: Props) {
  const { events } = useEvents();

  const event = events.find(e => e.id === eventId);

  if (!event) {
    return <Text>Событие не найдено</Text>;
  }

  return (
    <View>
      <Text>{event.title}</Text>
      <Text>{event.type}</Text>
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
