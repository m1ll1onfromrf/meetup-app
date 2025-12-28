// src/components/EventsMap/EventsMap.tsx
import { Event } from '@/types/event';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  events: Event[];
};

export default function EventsMap({ events }: Props) {
  return (
    <View style={styles.container}>
      <Text>🗺 Карта событий</Text>
      <Text>Количество событий: {events.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
