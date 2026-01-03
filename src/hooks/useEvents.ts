import { eventsService } from '@/services';
import { Event } from '@/types';
import { useEffect, useState } from 'react';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = eventsService.getEvents();
    setEvents(data);
    setLoading(false);
  }, []);

  const addEvent = (event: Event) => {
    eventsService.createEvent(event);
    setEvents(prev => [...prev, event]);
  };

  return {
    events,
    loading,
    addEvent,
  };
}
