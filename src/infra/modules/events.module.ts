import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsRepository } from '../../domain/event-manager/event/repositories/events-repository';
import { SlugGenerator } from '../../domain/event-manager/event/services/slug-generator';
import { CreateEventUseCase } from '../../domain/event-manager/event/use-cases/create-event-use-case';
import { GetEventsUseCase } from '../../domain/event-manager/event/use-cases/get-events-use-case';
import { EventAvailabilityProvider } from '../../domain/event-manager/registration/services/event-availability-provider';
import { TypeOrmEventAvailabilityProvider } from '../database/repositories/typeorm-event-availability-provider';
import { TypeOrmEventsRepository } from '../database/repositories/typeorm-events-repository';
import { TypeOrmEventEntity } from '../database/schemas/typeorm-event-entity';
import { EventController } from '../http/controllers/event-manager/event/event.controller';
import { TextToSlugGenerator } from '../http/text-to-slug-generator';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmEventEntity])],
  controllers: [EventController],
  providers: [
    CreateEventUseCase,
    GetEventsUseCase,
    TypeOrmEventsRepository,
    {
      provide: EventsRepository,
      useExisting: TypeOrmEventsRepository,
    },
    {
      provide: SlugGenerator,
      useClass: TextToSlugGenerator,
    },
    {
      provide: EventAvailabilityProvider,
      useClass: TypeOrmEventAvailabilityProvider,
    },
  ],
  exports: [EventAvailabilityProvider, EventsRepository],
})
export class EventsModule {}
