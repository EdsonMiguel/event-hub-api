import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollInEventUseCase } from './use-cases/enroll-in-event.use-case';
import { RegistrationController } from './infra/registration.controller';
import { Registration } from './domain/registration.entity';
import { EventsModule } from '../events/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Registration]), EventsModule],
  controllers: [RegistrationController],
  providers: [EnrollInEventUseCase],
})
export class RegistrationModule {}
