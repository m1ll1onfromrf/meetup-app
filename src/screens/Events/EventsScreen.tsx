import EventsMap from '@/components/EventsMap/EventsMap';
import { useEvents } from '@/hooks/useEvents';
import { View } from 'react-native';

export default function EventsScreen() {
  const { events } = useEvents();

  return (
    <View style={{ flex: 1 }}>
      <EventsMap events={events} />
    </View>
  );
}
