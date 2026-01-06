import { EventCard } from '@/components';
import { useEvents } from '@/hooks';
import { FlatList, Text, View } from 'react-native';

export default function EventsScreen() {
  const { events, loading } = useEvents();

  if (loading) {
    return <Text>Загрузка событий...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>
        События ({events.length})
      </Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
}
