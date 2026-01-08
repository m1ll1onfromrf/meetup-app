import { Event } from '@/types';
import { router } from 'expo-router';
import { FlatList, View } from 'react-native';
import { EventCard } from '../components/EventCard';

type Props = {
  events: Event[];
  onSelect?: (event: Event) => void;
};

export default function EventList({ events, onSelect }: Props) {
  return (
    <View style={{ maxHeight: 300 }}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => router.push(`/event/${item.id}`)}
          />
        )}
      />
    </View>
  );
}
