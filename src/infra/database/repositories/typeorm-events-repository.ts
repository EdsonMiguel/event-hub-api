import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../domain/event-manager/event/entities/event-entity';
import { EventsRepository } from '../../../domain/event-manager/event/repositories/events-repository';
import { TypeOrmEventMapper } from '../mappers/typeorm-event-mapper';
import { TypeOrmEventEntity } from '../schemas/typeorm-event-entity';

@Injectable()
export class TypeOrmEventsRepository implements EventsRepository {
  constructor(
    @InjectRepository(TypeOrmEventEntity)
    private readonly repository: Repository<TypeOrmEventEntity>,
  ) {}

  async findMany(): Promise<Event[]> {
    const events = await this.repository.find();

    return events.map(TypeOrmEventMapper.toDomain);
  }

  async findOneById(eventId: string): Promise<Event | undefined> {
    const event = await this.repository.findOne({
      where: { id: eventId },
    });

    return event ? TypeOrmEventMapper.toDomain(event) : undefined;
  }

  async save(event: Event): Promise<Event> {
    const savedEvent = await this.repository.save(
      TypeOrmEventMapper.toPersistence(event),
    );

    return TypeOrmEventMapper.toDomain(savedEvent);
  }
}
