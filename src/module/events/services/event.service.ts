import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event-dto';
import { textToSlug } from 'src/shared/functions/text-to-slug';
import { UserService } from 'src/module/users/services/user.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly userService: UserService,
  ) {}

  async create(event: CreateEventDto, userId: string) {
    const slug = textToSlug(event.name);

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const eventToCreate = this.eventRepository.create({
      ...event,
      slug,
      organizer: user,
    });

    const eventSave = await this.eventRepository.save(eventToCreate);
  }

  async findByIdIfAvailable(eventId: string) {
    return this.eventRepository.findOneBy({ id: eventId });
  }
  async findById(eventId: string) {}
  async findBySlug() {}
}
