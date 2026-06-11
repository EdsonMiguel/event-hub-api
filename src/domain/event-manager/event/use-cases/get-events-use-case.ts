import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../repositories/events-repository';

@Injectable()
export class GetEventsUseCase {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async execute() {
    return this.eventsRepository.findMany();
  }
}
