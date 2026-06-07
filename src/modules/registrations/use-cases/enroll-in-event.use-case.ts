import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from '../domain/registration.entity';
import { CreateRegistrationDto } from '../infra/http/dtos/cretate-registration.dto';
import type { IEventAvailabilityProvider } from '../../../shared/interfaces/event-availability.provider';

@Injectable()
export class EnrollInEventUseCase {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @Inject('IEventAvailabilityProvider')
    private readonly eventProvider: IEventAvailabilityProvider,
  ) {}

  async execute({ eventId }: CreateRegistrationDto, userId: string) {
    const eventCapacity = await this.eventProvider.getCapacity(eventId);

    if (!eventCapacity) {
      throw new NotFoundException('Evento não encontrado');
    }

    const registrationToCreate = this.registrationRepository.create({
      user: { id: userId },
      event: { id: eventId },
    });

    return await this.registrationRepository.save(registrationToCreate);
  }
}
