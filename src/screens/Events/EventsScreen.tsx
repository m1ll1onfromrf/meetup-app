import { EventList, EventsMap } from '@/components';
import { useEvents } from '@/context';
import { View } from 'react-native';

export default function EventsScreen() {
  const { events } = useEvents();

  return (
    <View style={{ flex: 1 }}>
      <EventsMap events={events} />
      <EventList events={events} />
    </View>
  );
}
