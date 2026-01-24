import { Event } from "@/types";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  event: Event;
  onPress: () => void;
};

export default function EventPreviewSheet({ event, onPress }: Props) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/events/${event.id}`)}
    >
      <View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.type}>
          {event.type === "vip" ? "VIP событие ⭐️" : "Обычное событие"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  type: {
    marginTop: 4,
    color: "#666",
  },
});
