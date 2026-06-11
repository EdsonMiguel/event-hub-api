export enum EventType {
  PHYSICAL = 'PHYSICAL',
  VIRTUAL = 'VIRTUAL',
}

export interface CreateEventProps {
  name: string;
  slug: string;
  description: string;
  maxParticipants: number;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location: string;
  organizerId: string;
  address?: string;
  meetingUrl?: string;
}

export class Event {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public description: string,
    public maxParticipants: number,
    public type: EventType,
    public startDate: Date,
    public endDate: Date,
    public location: string,
    public organizerId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public address?: string,
    public meetingUrl?: string,
  ) {}

  static create(props: CreateEventProps): Event {
    const now = new Date();

    return new Event(
      crypto.randomUUID(),
      props.name,
      props.slug,
      props.description,
      props.maxParticipants,
      props.type,
      props.startDate,
      props.endDate,
      props.location,
      props.organizerId,
      now,
      now,
      props.address,
      props.meetingUrl,
    );
  }
}
