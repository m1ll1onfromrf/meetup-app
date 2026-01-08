import { Event } from '@/types';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Props = {
  events: Event[];
};

export default function EventsMap({ events }: Props) {
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: events[0]?.lat ?? 55.75,
          longitude: events[0]?.lng ?? 37.61,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {events.map(event => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.lat,
              longitude: event.lng,
            }}
            title={event.title}
            pinColor={event.type === 'vip' ? 'gold' : 'red'}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '100%',
  },
});
