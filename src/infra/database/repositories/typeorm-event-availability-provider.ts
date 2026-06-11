import { Injectable } from '@nestjs/common';
import { EventAvailabilityProvider } from '../../../domain/event-manager/registration/services/event-availability-provider';
import { TypeOrmEventsRepository } from './typeorm-events-repository';

@Injectable()
export class TypeOrmEventAvailabilityProvider implements EventAvailabilityProvider {
  constructor(private readonly eventsRepository: TypeOrmEventsRepository) {}

  async getCapacity(
    eventId: string,
  ): Promise<{ maxParticipants: number } | null> {
    const event = await this.eventsRepository.findOneById(eventId);

    if (!event) {
      return null;
    }

    return { maxParticipants: event.maxParticipants };
  }
}
