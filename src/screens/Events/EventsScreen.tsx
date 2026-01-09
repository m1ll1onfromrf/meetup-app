import EventsMap from '@/components/EventsMap/EventsMap';
import { useEvents } from '@/context';
import { useRouter } from 'expo-router';
import { Button, View } from 'react-native';

export default function EventsScreen() {
  const { events } = useEvents();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <EventsMap events={events} />

      <View style={{ padding: 16 }}>
        <Button
          title="Найти мероприятие"
          onPress={() => router.push('/search-events')}
        />
      </View>
    </View>
  );
}
