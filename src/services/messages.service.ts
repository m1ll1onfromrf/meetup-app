import { supabase } from "./supabase";

export type EventMessage = {
  id: string;
  eventId: string;
  userId: string;
  text: string;
  createdAt: string;
};

function mapRow(row: any): EventMessage {
  return {
    id: row.id,
    eventId: row.event_id,
    userId: row.user_id,
    text: row.text,
    createdAt: row.created_at,
  };
}

// Последние N, но возвращаем по времени вверх (старые → новые)
export async function fetchMessages(
  eventId: string,
  limit = 50,
): Promise<EventMessage[]> {
  const { data, error } = await supabase
    .from("event_messages")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map(mapRow).reverse();
}

export async function sendMessage(params: {
  eventId: string;
  userId: string;
  text: string;
}): Promise<EventMessage> {
  const { data, error } = await supabase
    .from("event_messages")
    .insert({
      event_id: params.eventId,
      user_id: params.userId,
      text: params.text,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data);
}
