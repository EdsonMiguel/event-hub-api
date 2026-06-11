import { Event } from '../../../domain/event-manager/event/entities/event-entity';
import { TypeOrmEventEntity } from '../schemas/typeorm-event-entity';

export class TypeOrmEventMapper {
  static toDomain(raw: TypeOrmEventEntity): Event {
    return new Event(
      raw.id,
      raw.name,
      raw.slug,
      raw.description,
      raw.maxParticipants,
      raw.type,
      raw.startDate,
      raw.endDate,
      raw.location,
      raw.organizerId,
      raw.createdAt,
      raw.updatedAt,
      raw.address,
      raw.meetingUrl,
    );
  }

  static toPersistence(event: Event): TypeOrmEventEntity {
    const raw = new TypeOrmEventEntity();

    raw.id = event.id;
    raw.name = event.name;
    raw.slug = event.slug;
    raw.description = event.description;
    raw.maxParticipants = event.maxParticipants;
    raw.type = event.type;
    raw.startDate = event.startDate;
    raw.endDate = event.endDate;
    raw.location = event.location;
    raw.organizerId = event.organizerId;
    raw.address = event.address;
    raw.meetingUrl = event.meetingUrl;
    raw.createdAt = event.createdAt;
    raw.updatedAt = event.updatedAt;

    return raw;
  }
}
