// EventsScreen.tsx
import { EventsMap } from "@/components";
import EventPreviewSheet from "@/components/eventPreviewSheet";
import { useEvents } from "@/context";
import { useLocation } from "@/hooks";
import { Event } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function EventsScreen() {
  const { events } = useEvents();
  const { location } = useLocation();
  const router = useRouter();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <View style={{ flex: 1 }}>
      <EventsMap
        events={events}
        selectedEvent={selectedEvent}
        userLocation={location}
        onSelect={handleSelect}
      />
      {selectedEvent && (
        <EventPreviewSheet
          event={selectedEvent}
          onPress={() => router.push(`/events/${selectedEvent.id}`)}
        />
      )}
    </View>
  );
}
