export interface EventCapacity {
  maxParticipants: number;
}

export abstract class EventAvailabilityProvider {
  abstract getCapacity(eventId: string): Promise<EventCapacity | null>;
}
