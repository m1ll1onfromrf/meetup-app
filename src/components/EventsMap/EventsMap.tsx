import { Event } from '@/types';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Props = {
  events: Event[];
  selectedEvent?: Event | null;
  onSelect?: (event: Event) => void;
};


export default function EventsMap({
  events,
  selectedEvent,
  onSelect,
}: Props) {
  return (
    <MapView style={styles.map}>
      {events.map(event => (
        <Marker
          key={event.id}
          coordinate={{ latitude: event.lat, longitude: event.lng }}
          title={event.title}
          pinColor={
            selectedEvent?.id === event.id
              ? 'blue'
              : event.type === 'vip'
              ? 'gold'
              : 'red'
          }
          onPress={() => onSelect?.(event)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
