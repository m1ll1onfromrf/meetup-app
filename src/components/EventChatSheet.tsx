import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { messagesService } from "@/services";

type Props = {
  eventId: string;
  userId: string;
  enabled: boolean;
  topInset: number; // сколько оставить сверху (заголовок)
  containerHeight: number; // высота экрана (через onLayout)
  openTick?: number; // сигнал “показать снизу”
};

const SPRING = { damping: 35, stiffness: 300 };
const COLLAPSED_H = 160;

export default function EventChatSheet({
  eventId,
  userId,
  enabled,
  topInset,
  containerHeight,
  openTick,
}: Props) {
  const H = containerHeight || Dimensions.get("window").height;

  // позиции
  const expandedY = Math.max(topInset, 80);
  const collapsedY = Math.max(expandedY + 120, H - COLLAPSED_H);
  const hiddenY = H + 40;

  const sheetY = useSharedValue(hiddenY);
  const [expanded, setExpanded] = useState(false);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<messagesService.EventMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const listRef = useRef<FlatList>(null);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  const snapTo = (where: "expanded" | "collapsed" | "hidden") => {
    const target =
      where === "expanded"
        ? expandedY
        : where === "collapsed"
          ? collapsedY
          : hiddenY;

    sheetY.value = withSpring(target, SPRING);
    setExpanded(where === "expanded");
  };

  // показ/скрытие при enabled
  useEffect(() => {
    if (!enabled) {
      snapTo("hidden");
      return;
    }
    snapTo("collapsed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // “пинок” показать снизу (например после join)
  useEffect(() => {
    if (!enabled) return;
    snapTo("collapsed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTick]);

  // загрузка сообщений
  const load = async () => {
    setLoading(true);
    try {
      const data = await messagesService.fetchMessages(eventId, 60);
      setMessages(data);
      requestAnimationFrame(() =>
        listRef.current?.scrollToEnd({ animated: false }),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, eventId]);

  const onSend = async () => {
    const t = text.trim();
    if (!t) return;

    setText("");
    try {
      await messagesService.sendMessage({ eventId, userId, text: t });
      await load();
      snapTo("expanded");
    } catch (e) {
      console.error("sendMessage failed:", e);
    }
  };

  const toggleExpanded = () => {
    snapTo(expanded ? "collapsed" : "expanded");
  };

  if (!enabled || H <= 0) return null;

  return (
    <>
      {/* backdrop — только когда раскрыто */}
      {expanded && (
        <Pressable
          style={styles.backdrop}
          onPress={() => snapTo("collapsed")}
        />
      )}

      <Animated.View style={[styles.sheet, { height: H + 40 }, animStyle]}>
        {/* Top bar with arrow */}
        <View style={styles.topBar}>
          <Pressable onPress={toggleExpanded} style={styles.chevronBtn}>
            <Text style={styles.chevronText}>{expanded ? "▾" : "▴"}</Text>
          </Pressable>
          <Text style={styles.topTitle}>Чат</Text>
          <View style={{ width: 50 }} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.content}
        >
          <View style={styles.listWrap}>
            <FlatList
              ref={listRef}
              data={messages}
              keyExtractor={(m) => m.id}
              onRefresh={load}
              refreshing={loading}
              renderItem={({ item }) => {
                const mine = item.userId === userId;
                return (
                  <View
                    style={[
                      styles.msgRow,
                      mine ? styles.msgRowMine : styles.msgRowOther,
                    ]}
                  >
                    <View
                      style={[
                        styles.bubble,
                        mine ? styles.bubbleMine : styles.bubbleOther,
                      ]}
                    >
                      <Text style={styles.bubbleText}>{item.text}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              value={text}
              onChangeText={setText}
              onFocus={() => snapTo("expanded")}
              placeholder="Написать сообщение…"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              multiline
            />
            <Pressable
              style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
              onPress={onSend}
              disabled={!text.trim()}
            >
              <Text style={styles.sendText}>→</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  sheet: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 1,
    overflow: "hidden",
  },
  topBar: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  topTitle: {
    fontWeight: "600",
    color: "#0f172a",
  },
  chevronBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronText: {
    fontSize: 18,
    color: "#0f172a",
  },
  content: {
    flex: 1,
  },
  listWrap: {
    flex: 1,
    paddingHorizontal: 12,
  },
  msgRow: {
    paddingVertical: 4,
    flexDirection: "row",
  },
  msgRowMine: {
    justifyContent: "flex-end",
  },
  msgRowOther: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  bubbleMine: {
    backgroundColor: "#e0f2fe",
  },
  bubbleOther: {
    backgroundColor: "#f1f5f9",
  },
  bubbleText: {
    color: "#0f172a",
    fontSize: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#0f172a",
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#0ea5e9",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: {
    backgroundColor: "#93c5fd",
  },
  sendText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
