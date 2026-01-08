import * as EventsContext from '@/context';
import { Stack } from 'expo-router';

console.log('EventsContext:', EventsContext);

export default function RootLayout() {
  return (
    <>
      <Stack />
    </>
  );
}

