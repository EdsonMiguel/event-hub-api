import { Injectable } from '@nestjs/common';
import { Event, EventType } from '../entities/event-entity';
import { EventsRepository } from '../repositories/events-repository';
import { SlugGenerator } from '../services/slug-generator';

interface CreateEventRequest {
  name: string;
  description: string;
  maxParticipants: number;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location: string;
  organizerId: string;
  address?: string;
  meetingUrl?: string;
}

@Injectable()
export class CreateEventUseCase {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly slugGenerator: SlugGenerator,
  ) {}

  async execute(event: CreateEventRequest) {
    const slug = this.slugGenerator.generate(event.name);

    const eventToCreate = Event.create({
      ...event,
      slug,
    });

    return this.eventsRepository.save(eventToCreate);
  }
}
