import { EventsMap } from '@/components';
import { useEvents } from '@/hooks';
import { View } from 'react-native';

export default function EventsScreen() {
  const { events } = useEvents();

  return (
    <View style={{ flex: 1 }}>
      <EventsMap events={events} />
    </View>
  );
}
