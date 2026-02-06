import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Button,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { EventChatSheet } from "@/components";
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

  const [chatOpenTick, setChatOpenTick] = useState(0);
  const [joinedOptimistic, setJoinedOptimistic] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [joining, setJoining] = useState(false);

  const [containerHeight, setContainerHeight] = useState(0);

  // высота верхней части (заголовок + кнопка)
  const [topInset, setTopInset] = useState(160);

  const isJoined = userId ? members.includes(userId) : false;
  const isJoinedForUi = isJoined || joinedOptimistic;

  const containerHeightRef = useRef<number | null>(null);

  const onHeaderLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    // + небольшой запас, чтобы “шит” точно не перекрыл заголовок
    if (h > 60) setTopInset(h + 12);
  };

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
        if (id) setJoinedOptimistic(list.includes(id));
      } catch (e) {
        console.error("Failed to load members:", e);
        if (!cancelled)
          Alert.alert("Ошибка", "Не удалось загрузить участников");
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
    if (!event || !userId) return;

    try {
      setJoining(true);

      if (isJoined) {
        setMembers((prev) => prev.filter((x) => x !== userId));
        setJoinedOptimistic(false);
        await membersService.leaveEvent(eventId, userId);
      } else {
        setMembers((prev) =>
          prev.includes(userId) ? prev : [...prev, userId],
        );
        await membersService.joinEvent(eventId, userId);
        setJoinedOptimistic(true);
        setChatOpenTick((t) => t + 1);
      }

      const list = await membersService.getEventMembers(eventId);
      setMembers(list);
      setJoinedOptimistic(list.includes(userId));
    } catch (e) {
      console.error("Join/Leave failed:", e);
      Alert.alert("Ошибка", "Не удалось выполнить действие. Попробуй ещё раз.");

      try {
        const list = await membersService.getEventMembers(eventId);
        setMembers(list);
        setJoinedOptimistic(list.includes(userId));
      } catch {}
    } finally {
      setJoining(false);
    }
  };

  if (!event) {
    return <Text style={{ padding: 16 }}>Событие не найдено</Text>;
  }

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      {/* HEADER: именно это должно оставаться видимым даже когда чат раскрыт */}
      <View
        //onLayout={onHeaderLayout}
        style={styles.header}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (containerHeightRef.current === null && h > 0) {
            containerHeightRef.current = h;
            setContainerHeight(h);
          }
        }}
      >
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subtitle}>Тип: {event.type}</Text>

        <Text style={styles.members}>
          Участники: {loadingMembers ? "загрузка..." : members.length}
        </Text>

        <View style={styles.buttonWrap}>
          <Button
            title={
              joining
                ? "Подождите..."
                : isJoined
                  ? "Покинуть"
                  : "Присоединиться"
            }
            onPress={handleToggleJoin}
            disabled={joining || loadingMembers || !userId}
          />
        </View>
      </View>

      {/* BODY: остальная детализация (пока пустая, но сюда ты добавишь описание и т.д.) */}
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

      {/* CHAT: появляется только если joined */}
      {isJoinedForUi && userId && containerHeight > 0 && (
        <EventChatSheet
          eventId={eventId}
          userId={userId}
          enabled={true}
          topInset={topInset}
          openTick={1}
          containerHeight={containerHeight}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
    marginTop: 2,
    fontSize: 16,
  },
  buttonWrap: {
    marginTop: 2,
  },
  membersList: {
    marginTop: 6,
    marginHorizontal: 16,
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
