import { useEvents } from '@/hooks';
import EventDetailsScreen from '@/screens/EventDetails/EventDetailScreen';
import { useLocalSearchParams } from 'expo-router';

export default function EventDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { events } = useEvents();

  const event = events.find(e => e.id === id);

  return <EventDetailsScreen event={event} />;
}
