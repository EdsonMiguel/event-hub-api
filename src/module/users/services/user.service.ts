import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: user.email }, { username: user.username }],
    });

    if (existingUser) {
      if (existingUser.email === user.email) {
        throw new ConflictException('Este e-mail já está em uso.');
      }
      throw new ConflictException('Este username já está em uso.');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);

    const userToCreate = this.userRepository.create({
      name: user.name,
      email: user.email,
      username: user.username,
      password: passwordHash,
    });

    const savedUser = await this.userRepository.save(userToCreate);
    return savedUser;
  }
}
