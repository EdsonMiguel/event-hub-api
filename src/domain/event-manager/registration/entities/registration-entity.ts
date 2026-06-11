export enum RegistrationStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  ATTENDED = 'ATTENDED',
}

interface CreateRegistrationProps {
  userId: string;
  eventId: string;
  status?: RegistrationStatus;
}

export class Registration {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly eventId: string,
    public status: RegistrationStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(props: CreateRegistrationProps): Registration {
    const now = new Date();

    return new Registration(
      crypto.randomUUID(),
      props.userId,
      props.eventId,
      props.status ?? RegistrationStatus.CONFIRMED,
      now,
      now,
    );
  }
}
