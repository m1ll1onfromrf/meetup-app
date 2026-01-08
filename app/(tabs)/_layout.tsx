import { EventsProvider } from '@/context/EventsContext';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <EventsProvider>
      <Tabs />
    </EventsProvider>
  );
}
