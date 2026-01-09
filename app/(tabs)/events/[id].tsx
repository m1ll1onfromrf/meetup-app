import EventDetailsScreen from '@/screens/EventDetails/EventDetailScreen';
import { useLocalSearchParams } from 'expo-router';

export default function EventDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return <EventDetailsScreen eventId={id} />;
}
