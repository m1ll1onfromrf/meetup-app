export type EventType = 'vip' | 'regular';

export interface Event {
  id: string;
  title: string;
  type: EventType;
  lat: number;
  lng: number;
}
