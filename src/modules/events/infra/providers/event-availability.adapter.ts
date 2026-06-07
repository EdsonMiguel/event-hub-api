import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../domain/event.entity';
import { IEventAvailabilityProvider } from '../../../../shared/interfaces/event-availability.provider';

@Injectable()
export class EventAvailabilityAdapter implements IEventAvailabilityProvider {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getCapacity(
    eventId: string,
  ): Promise<{ maxParticipants: number } | null> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      select: { maxParticipants: true },
    });

    if (!event) return null;

    return { maxParticipants: event.maxParticipants };
  }
}
