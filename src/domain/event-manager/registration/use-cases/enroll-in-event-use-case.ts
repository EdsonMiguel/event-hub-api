import { Injectable, NotFoundException } from '@nestjs/common';
import { Registration } from '../entities/registration-entity';
import { RegistrationsRepository } from '../repositories/registrations-repository';
import { EventAvailabilityProvider } from '../services/event-availability-provider';

interface EnrollInEventRequest {
  eventId: string;
  userId: string;
}

@Injectable()
export class EnrollInEventUseCase {
  constructor(
    private readonly registrationsRepository: RegistrationsRepository,
    private readonly eventAvailabilityProvider: EventAvailabilityProvider,
  ) {}

  async execute({ eventId, userId }: EnrollInEventRequest) {
    const eventCapacity =
      await this.eventAvailabilityProvider.getCapacity(eventId);

    if (!eventCapacity) {
      throw new NotFoundException('Evento nao encontrado');
    }

    const registration = Registration.create({
      eventId,
      userId,
    });

    return this.registrationsRepository.save(registration);
  }
}
