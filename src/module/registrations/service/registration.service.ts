import { Repository } from 'typeorm';
import { Registration } from '../entities/registration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/module/users/services/user.service';
import { EventService } from 'src/module/events/services/event.service';
import { CreateRegistrationDto } from '../dto/create-registration.dto';
import { BadRequestException } from '@nestjs/common';

export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  async create({ eventId }: CreateRegistrationDto, userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const event = await this.eventService.findByIdIfAvailable(eventId);

    if (!event) {
      throw new BadRequestException('Evento não encontrado');
    }

    const registrationToCreate = this.registrationRepository.create({
      user,
      event,
    });

    const registrationSaved =
      await this.registrationRepository.save(registrationToCreate);

    return registrationSaved;
  }
}
