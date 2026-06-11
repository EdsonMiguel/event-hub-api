import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/account/user/entities/user-entity';
import { UsersRepository } from '../../../domain/account/user/repositories/users-repository';
import { TypeOrmUserMapper } from '../mappers/typeorm-user-mapper';
import { TypeOrmUserEntity } from '../schemas/typeorm-user-entity';

@Injectable()
export class TypeOrmUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
  ) {}

  async findOneById(userId: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user ? TypeOrmUserMapper.toDomain(user) : undefined;
  }

  async findOneBy(user: Partial<User>): Promise<User | undefined> {
    const where = [
      user.email ? { email: user.email } : undefined,
      user.username ? { username: user.username } : undefined,
    ].filter(Boolean) as Array<Partial<TypeOrmUserEntity>>;

    if (where.length === 0) {
      return undefined;
    }

    const foundUser = await this.repository.findOne({ where });

    return foundUser ? TypeOrmUserMapper.toDomain(foundUser) : undefined;
  }

  async findOneByUsernameWithPassword(
    username: string,
  ): Promise<User | undefined> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();

    return user ? TypeOrmUserMapper.toDomain(user) : undefined;
  }

  async save(user: User): Promise<User> {
    const savedUser = await this.repository.save(
      TypeOrmUserMapper.toPersistence(user),
    );

    return TypeOrmUserMapper.toDomain(savedUser);
  }
}
