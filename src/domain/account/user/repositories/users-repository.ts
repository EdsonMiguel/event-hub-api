import { User } from '../entities/user-entity';

export abstract class UsersRepository {
  abstract findOneById(userId: string): Promise<User | undefined>;
  abstract findOneBy(user: Partial<User>): Promise<User | undefined>;
  abstract findOneByUsernameWithPassword(
    username: string,
  ): Promise<User | undefined>;
  abstract save(user: User): Promise<User>;
}
