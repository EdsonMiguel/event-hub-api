import { User } from '../../../domain/account/user/entities/user-entity';
import { TypeOrmUserEntity } from '../schemas/typeorm-user-entity';

export class TypeOrmUserMapper {
  static toDomain(raw: TypeOrmUserEntity): User {
    return new User(
      raw.id,
      raw.name,
      raw.username,
      raw.email,
      raw.password,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(user: User): TypeOrmUserEntity {
    const raw = new TypeOrmUserEntity();

    raw.id = user.id;
    raw.name = user.name;
    raw.username = user.username;
    raw.email = user.email;
    raw.password = user.getPasswordHash();
    raw.createdAt = user.createdAt;
    raw.updatedAt = user.updatedAt;

    return raw;
  }
}
