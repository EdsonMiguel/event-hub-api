import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsRepository } from '../../domain/event-manager/registration/repositories/registrations-repository';
import { EnrollInEventUseCase } from '../../domain/event-manager/registration/use-cases/enroll-in-event-use-case';
import { TypeOrmRegistrationsRepository } from '../database/repositories/typeorm-registrations-repository';
import { TypeOrmRegistrationEntity } from '../database/schemas/typeorm-registration-entity';
import { RegistrationController } from '../http/controllers/event-manager/registration/registration.controller';
import { EventsModule } from './events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmRegistrationEntity]),
    EventsModule,
  ],
  controllers: [RegistrationController],
  providers: [
    EnrollInEventUseCase,
    {
      provide: RegistrationsRepository,
      useClass: TypeOrmRegistrationsRepository,
    },
  ],
})
export class RegistrationsModule {}
