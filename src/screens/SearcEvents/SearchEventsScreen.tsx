import EventList from '@/components/EventList';
import { useEvents } from '@/context';
import { useLocation } from '@/hooks';
import { getDistance } from '@/utils/geo';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

type SortType = 'distance' | 'vip';

export default function SearchEventsScreen() {
  const { events } = useEvents();
  const { location } = useLocation();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortType>('distance');

  const filteredEvents = useMemo(() => {
    return events.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [events, query]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      if (sort === 'vip') {
        if (a.type === b.type) return 0;
        return a.type === 'vip' ? -1 : 1;
      }

      if (!location && sort === 'distance') {
      return 0;
      } 

      const distA = getDistance(location, a);
      const distB = getDistance(location, b);

      return distA - distB;
    });
  }, [filteredEvents, sort, location]);

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

      <View style={{ flexDirection: 'row', padding: 8 }}>
        <Button 
        title="По расстоянию" 
        color={sort === 'distance' ? 'blue' : 'gray'}
        onPress={() => setSort('distance')} />
        <Button 
        title="VIP" 
        onPress={() => setSort('vip')} />
      </View>

      <EventList
        events={sortedEvents}
        onSelect={(event) => router.push(`/events/${event.id}`)}
      />
    </View>
  );
}
