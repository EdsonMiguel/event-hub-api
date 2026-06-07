import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../domain/event.entity';
import { CreateEventDto } from '../infra/http/dtos/create-event.dto';
import { textToSlug } from 'src/shared/functions/text-to-slug';

@Injectable()
export class CreateEventUseCase {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(eventDto: CreateEventDto, userId: string) {
    const slug = textToSlug(eventDto.name);

    const eventToCreate = this.eventRepository.create({
      ...eventDto,
      slug,
      organizer: { id: userId },
    });

    const eventSave = await this.eventRepository.save(eventToCreate);

    return eventSave;
  }
}
