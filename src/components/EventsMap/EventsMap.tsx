import { Event } from '@/types';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Props = {
  events: Event[];
  selectedEvent?: Event | null;
  onSelect?: (event: Event) => void;
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
};


export default function EventsMap({
  events,
  selectedEvent,
  onSelect,
  userLocation,
}: Props) {
  return (
    console.log(userLocation),
    <MapView
      style={styles.map}
      initialRegion={{
        latitude:
          userLocation?.latitude ?? events[0]?.lat ?? 55.75,
        longitude:
          userLocation?.longitude ?? events[0]?.lng ?? 37.61,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {events.map(event => (
        <Marker
          key={event.id}
          coordinate={{ latitude: event.lat, longitude: event.lng }}
          title={event.title}
          pinColor={
            selectedEvent?.id === event.id
              ? 'blue'
              : event.type === 'vip'
              ? '#FFD700'
              : 'red'
          }
          onPress={() => onSelect?.(event)}
        />
      ))}

      {userLocation && (
        <Marker
          coordinate={userLocation}
          title="Вы здесь"
          pinColor="blue"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
