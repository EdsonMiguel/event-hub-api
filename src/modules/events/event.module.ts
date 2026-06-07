import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './domain/event.entity';
import { EventAvailabilityAdapter } from './infra/providers/event-availability.adapter';
import { EventController } from './infra/http/event.controller';
import { CreateEventUseCase } from './use-cases/create-event.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [
    {
      provide: 'IEventAvailabilityProvider',
      useClass: EventAvailabilityAdapter,
    },
    CreateEventUseCase,
  ],
  exports: ['IEventAvailabilityProvider'],
})
export class EventsModule {}
