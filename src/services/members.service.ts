import { supabase } from "./supabase";

export async function joinEvent(
  eventId: string,
  userId: string,
): Promise<void> {
  const { error } = await supabase.from("event_members").insert({
    event_id: eventId,
    user_id: userId,
  });
  if (error) throw error;
}

export async function leaveEvent(
  eventId: string,
  userId: string,
): Promise<void> {
  const { error } = await supabase
    .from("event_members")
    .delete()
    .eq("event_id", eventId)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function getEventMembers(eventId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("event_members")
    .select("user_id")
    .eq("event_id", eventId)
    .order("joined_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row: any) => row.user_id as string);
}
