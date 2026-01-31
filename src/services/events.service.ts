import { Event } from "@/types";

const MOCK_EVENTS: Event[] = [
  { id: "1", title: "VIP Meetup", type: "vip", lat: 55.75, lng: 37.61 },
  { id: "2", title: "Regular Event", type: "regular", lat: 55.76, lng: 37.62 },
  { id: "3", title: "Another VIP Event", type: "vip", lat: 56.77, lng: 36.63 },
  {
    id: "4",
    title: "Community Gathering",
    type: "regular",
    lat: 54.74,
    lng: 38.64,
  },
];

function isSupabaseEnabled() {
  return Boolean(
    process.env.EXPO_PUBLIC_SUPABASE_URL &&
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  );
}

async function fetchEventsFromSupabase(): Promise<Event[]> {
  const { supabase } = await import("./supabase");

  const { data, error } = await supabase
    .from("events")
    .select("id,title,type,lat,lng")
    .order("created_at", { ascending: false });

  if (error) throw error;

  // data типизируем вручную
  return (data ?? []).map((row: any) => ({
    id: row.id,
    title: row.title,
    type: row.type,
    lat: row.lat,
    lng: row.lng,
  })) as Event[];
}

async function createEventInSupabase(event: Event): Promise<void> {
  const { supabase } = await import("./supabase");

  const { error } = await supabase.from("events").insert({
    id: event.id, // мы оставляем генерацию UUID на клиенте, чтобы не ломать UI
    title: event.title,
    type: event.type,
    lat: event.lat,
    lng: event.lng,
  });

  if (error) throw error;
}

export const eventsService = {
  async fetchEvents(): Promise<Event[]> {
    if (!isSupabaseEnabled()) {
      return MOCK_EVENTS;
    }
    return fetchEventsFromSupabase();
  },

  async createEvent(event: Event): Promise<void> {
    if (!isSupabaseEnabled()) {
      MOCK_EVENTS.push(event);
      return;
    }
    await createEventInSupabase(event);
  },
};
