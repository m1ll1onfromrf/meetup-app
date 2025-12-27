import { useState } from 'react';
import { getEvents } from 'src/services/events.service';
import { Event } from 'src/types/event';

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
