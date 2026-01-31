import { eventsService } from "@/services";
import { Event } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type EventsContextValue = {
  events: Event[];
  addEvent: (event: Event) => Promise<void>;
  refresh: () => Promise<void>;
  loading: boolean;
};

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await eventsService.fetchEvents();
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const addEvent = async (event: Event) => {
    // оптимистично добавляем в UI (чтобы не было ощущения тормозов)
    setEvents((prev) => [...prev, event]);

    try {
      await eventsService.createEvent(event);
      // подтянуть "истинные" данные (важно для backend-режима)
      await refresh();
    } catch (e) {
      setEvents((prev) => prev.filter((x) => x.id !== event.id));
      console.error("createEvent failed:", e);
      // если хочешь — можем сделать rollback, но пока оставим так (минимальный риск поломок)
      throw e;
    }
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, refresh, loading }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within EventsProvider");
  }
  return context;
}
