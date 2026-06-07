export interface IEventAvailabilityProvider {
  getCapacity(eventId: string): Promise<{ maxParticipants: number } | null>;
}
