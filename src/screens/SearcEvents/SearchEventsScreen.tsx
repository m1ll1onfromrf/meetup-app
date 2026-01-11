import EventList from '@/components/EventList';
import { useEvents } from '@/context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

export default function SearchEventsScreen() {
  const { events } = useEvents();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Поиск мероприятия"
        value={query}
        onChangeText={setQuery}
        style={{
          padding: 12,
          borderBottomWidth: 1,
          borderColor: '#ddd',
        }}
      />

      <EventList
        events={filteredEvents}
        onSelect={(event) => router.push(`/events/${event.id}`)}
      />
    </View>
  );
}
