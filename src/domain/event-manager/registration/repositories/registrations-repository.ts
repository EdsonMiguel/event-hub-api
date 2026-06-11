import { Registration } from '../entities/registration-entity';

export abstract class RegistrationsRepository {
  abstract save(registration: Registration): Promise<Registration>;
}
