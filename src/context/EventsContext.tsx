import { eventsService } from '@/services';
import { Event } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

type EventsContextValue = {
  events: Event[];
  addEvent: (event: Event) => void;
};

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(eventsService.getEvents());
  }, []);

  const addEvent = (event: Event) => {
    eventsService.createEvent(event);
    setEvents(prev => [...prev, event]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error('useEvents must be used within EventsProvider');
  }

  return context;
}
