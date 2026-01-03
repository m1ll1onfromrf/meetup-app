import { getEvents } from '@/services';
import { Event } from '@/types';
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
