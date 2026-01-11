import { Event } from '@/types';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'VIP Meetup',
    type: 'vip',
    lat: 55.75,
    lng: 37.61,
  },
  {
    id: '2',
    title: 'Regular Event',
    type: 'regular',
    lat: 55.76,
    lng: 37.62,
  },
  {
    id: '3',
    title: 'Another VIP Event',
    type: 'vip',
    lat: 56.77,
    lng: 36.63,
  },
  {
    id: '4',
    title: 'Community Gathering',
    type: 'regular',
    lat: 54.74,
    lng: 38.64,
  },
];

export const eventsService = {
  getEvents(): Event[] {
    return MOCK_EVENTS;
  },

  createEvent(event: Event) {
    MOCK_EVENTS.push(event);
  },
};
