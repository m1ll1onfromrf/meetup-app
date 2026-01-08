import { EventList, EventsMap } from '@/components';
import { useEvents } from '@/context/EventsContext';
import { View } from 'react-native';

export default function EventsScreen() {
  const { events } = useEvents();

  const handleSelect = (event) => {
    console.log('Выбрано событие:', event.id);
  };

  return (
    <View style={{ flex: 1 }}>
      <EventsMap events={events} />
      <EventList events={events} onSelect={handleSelect} />
    </View>
  );
}
