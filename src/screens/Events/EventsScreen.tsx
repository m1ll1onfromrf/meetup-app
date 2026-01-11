import { EventsMap } from '@/components';
import { useEvents } from '@/context';
import { useLocation } from '@/hooks';
import { View } from 'react-native';

export default function EventsScreen() {
  const { events } = useEvents();
  const { location } = useLocation();

  console.log('USER LOCATION:', location);

  return (
    <View style={{ flex: 1 }}>
      <EventsMap
        events={events}
        userLocation={location}
      />
    </View>
  );
}
