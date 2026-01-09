import EventList from '@/components/EventList';
import { useEvents } from '@/context';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function SearchEventsScreen() {
  const { events } = useEvents();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <EventList
        events={events}
        onSelect={(event) => router.push(`/events/${event.id}`)}
      />
    </View>
  );
}
