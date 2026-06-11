import { Event } from '../entities/event-entity';

export abstract class EventsRepository {
  abstract findMany(): Promise<Event[]>;
  abstract findOneById(eventId: string): Promise<Event | undefined>;
  abstract save(event: Event): Promise<Event>;
}
