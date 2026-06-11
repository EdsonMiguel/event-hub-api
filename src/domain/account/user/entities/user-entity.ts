interface CreateUserProps {
  name: string;
  username: string;
  email: string;
  passwordHash: string;
}

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public username: string,
    public email: string,
    private passwordHash: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(props: CreateUserProps): User {
    const now = new Date();

    return new User(
      crypto.randomUUID(),
      props.name,
      props.username,
      props.email,
      props.passwordHash,
      now,
      now,
    );
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
