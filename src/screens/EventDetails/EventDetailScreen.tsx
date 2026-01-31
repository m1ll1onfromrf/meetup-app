import { useEffect, useMemo, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import { useEvents } from "@/context";
import { getDeviceUserId, membersService } from "@/services";

type Props = {
  eventId: string;
};

export default function EventDetailsScreen({ eventId }: Props) {
  const { events } = useEvents();
  const event = useMemo(
    () => events.find((e) => e.id === eventId),
    [events, eventId],
  );

  const [userId, setUserId] = useState<string | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [joining, setJoining] = useState(false);

  const isJoined = userId ? members.includes(userId) : false;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setLoadingMembers(true);
        const id = await getDeviceUserId();
        const list = await membersService.getEventMembers(eventId);

        if (cancelled) return;
        setUserId(id);
        setMembers(list);
      } catch (e) {
        console.error("Failed to load members:", e);
        if (!cancelled) {
          Alert.alert("Ошибка", "Не удалось загрузить участников");
        }
      } finally {
        if (!cancelled) setLoadingMembers(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [eventId]);

  const handleToggleJoin = async () => {
    if (!event) return;
    if (!userId) return;

    try {
      setJoining(true);

      if (isJoined) {
        // оптимистично убираем себя
        setMembers((prev) => prev.filter((x) => x !== userId));
        await membersService.leaveEvent(eventId, userId);
      } else {
        // оптимистично добавляем себя
        setMembers((prev) =>
          prev.includes(userId) ? prev : [...prev, userId],
        );
        await membersService.joinEvent(eventId, userId);
      }

      // Подтягиваем “истину” с сервера (на случай гонок)
      const list = await membersService.getEventMembers(eventId);
      setMembers(list);
    } catch (e) {
      console.error("Join/Leave failed:", e);
      Alert.alert("Ошибка", "Не удалось выполнить действие. Попробуй ещё раз.");

      // откатим состояние, подтянув серверную правду
      try {
        const list = await membersService.getEventMembers(eventId);
        setMembers(list);
      } catch {}
    } finally {
      setJoining(false);
    }
  };

  if (!event) {
    return <Text style={{ padding: 16 }}>Событие не найдено</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.subtitle}>Тип: {event.type}</Text>

      <Text style={styles.members}>
        Участники: {loadingMembers ? "загрузка..." : members.length}
      </Text>

      <View style={styles.buttonWrap}>
        <Button
          title={
            joining ? "Подождите..." : isJoined ? "Покинуть" : "Присоединиться"
          }
          onPress={handleToggleJoin}
          disabled={joining || loadingMembers || !userId}
        />
      </View>

      {!loadingMembers && members.length > 0 && (
        <View style={styles.membersList}>
          <Text style={styles.membersHeader}>Кто идёт:</Text>
          {members.slice(0, 15).map((id) => (
            <Text key={id} style={styles.memberItem}>
              {id === userId ? "• Вы" : `• ${id.slice(0, 8)}…`}
            </Text>
          ))}
          {members.length > 15 && (
            <Text style={styles.more}>и ещё {members.length - 15}…</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    color: "#475569",
  },
  members: {
    marginTop: 8,
    fontSize: 16,
  },
  buttonWrap: {
    marginTop: 6,
  },
  membersList: {
    marginTop: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  membersHeader: {
    fontWeight: "600",
    marginBottom: 8,
  },
  memberItem: {
    paddingVertical: 2,
    color: "#0f172a",
  },
  more: {
    marginTop: 6,
    color: "#64748b",
  },
});
