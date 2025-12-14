// mobile/app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Главная",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>🏠</Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
          title: "Создать",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>➕</Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="events" 
        options={{ 
          title: "Карта",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>🗺️</Text>
          ),
        }} 
      />
    </Tabs>
  );
}