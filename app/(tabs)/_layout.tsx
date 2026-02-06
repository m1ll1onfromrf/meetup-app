import { EventsProvider } from "@/context/EventsContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <EventsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 62, paddingTop: 6, paddingBottom: 8 },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Главная",
            tabBarLabel: "Главная",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Создать",
            tabBarLabel: "Создать",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="events"
          options={{
            title: "События",
            tabBarLabel: "События",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map-outline" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="search-events"
          options={{
            title: "Поиск",
            tabBarLabel: "Поиск",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" color={color} size={size} />
            ),
          }}
        />

        {/* ВАЖНО: деталку скрываем из таббара */}
        <Tabs.Screen
          name="events/[id]"
          options={{
            href: null, // скрыть из навигации по вкладкам
            // скрыть кнопку вкладки
          }}
        />
      </Tabs>
    </EventsProvider>
  );
}
