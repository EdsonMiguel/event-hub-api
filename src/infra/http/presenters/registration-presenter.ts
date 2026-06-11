import { Registration } from '../../../domain/event-manager/registration/entities/registration-entity';

export class RegistrationPresenter {
  static toHTTP(registration: Registration) {
    return {
      id: registration.id,
      userId: registration.userId,
      eventId: registration.eventId,
      status: registration.status,
      createdAt: registration.createdAt,
      updatedAt: registration.updatedAt,
    };
  }
}
