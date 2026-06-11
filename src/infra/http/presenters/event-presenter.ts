import { Event } from '../../../domain/event-manager/event/entities/event-entity';

export class EventPresenter {
  static toHTTP(event: Event) {
    return {
      id: event.id,
      name: event.name,
      slug: event.slug,
      description: event.description,
      maxParticipants: event.maxParticipants,
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      address: event.address,
      meetingUrl: event.meetingUrl,
      organizerId: event.organizerId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }
}
