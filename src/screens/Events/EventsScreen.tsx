import { View } from 'react-native';
import { useEvents } from 'src/hooks/useEvents';
import EventsMap from './EventsMap';

export default function EventsScreen() {
  const { events } = useEvents();

  return (
    <View style={{ flex: 1 }}>
      <EventsMap events={events} />
    </View>
  );
}
