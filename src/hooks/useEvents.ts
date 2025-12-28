import { getEvents } from '@/services/events.service';
import { Event } from '@/types/event';
import { useState } from 'react';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(getEvents());

  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
  };

  return {
    events,
    addEvent,
  };
}
