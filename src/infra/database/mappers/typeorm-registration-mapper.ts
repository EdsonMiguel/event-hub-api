import { Registration } from '../../../domain/event-manager/registration/entities/registration-entity';
import { TypeOrmRegistrationEntity } from '../schemas/typeorm-registration-entity';

export class TypeOrmRegistrationMapper {
  static toDomain(raw: TypeOrmRegistrationEntity): Registration {
    return new Registration(
      raw.id,
      raw.userId,
      raw.eventId,
      raw.status,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(registration: Registration): TypeOrmRegistrationEntity {
    const raw = new TypeOrmRegistrationEntity();

    raw.id = registration.id;
    raw.userId = registration.userId;
    raw.eventId = registration.eventId;
    raw.status = registration.status;
    raw.createdAt = registration.createdAt;
    raw.updatedAt = registration.updatedAt;

    return raw;
  }
}
