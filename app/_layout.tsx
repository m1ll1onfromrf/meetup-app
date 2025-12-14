// mobile/app/_layout.tsx
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="event/[id]" 
        options={{ 
          title: "Мероприятие",
          headerStyle: { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          // УДАЛЕНО: headerBackTitleVisible: false,
        }} 
      />
    </Stack>
  );
}