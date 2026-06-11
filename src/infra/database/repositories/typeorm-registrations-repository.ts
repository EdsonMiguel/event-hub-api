import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from '../../../domain/event-manager/registration/entities/registration-entity';
import { RegistrationsRepository } from '../../../domain/event-manager/registration/repositories/registrations-repository';
import { TypeOrmRegistrationMapper } from '../mappers/typeorm-registration-mapper';
import { TypeOrmRegistrationEntity } from '../schemas/typeorm-registration-entity';

@Injectable()
export class TypeOrmRegistrationsRepository implements RegistrationsRepository {
  constructor(
    @InjectRepository(TypeOrmRegistrationEntity)
    private readonly repository: Repository<TypeOrmRegistrationEntity>,
  ) {}

  async save(registration: Registration): Promise<Registration> {
    const savedRegistration = await this.repository.save(
      TypeOrmRegistrationMapper.toPersistence(registration),
    );

    return TypeOrmRegistrationMapper.toDomain(savedRegistration);
  }
}
