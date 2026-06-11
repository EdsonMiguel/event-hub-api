import { User } from '../entities/user-entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { CryptographyService } from '../services/cryptography-service';

interface CreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly cryptographyService: CryptographyService,
  ) {}

  async execute({ email, name, username, password }: CreateUser) {
    const existingUser = await this.userRepository.findOneBy({
      email,
      username,
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException('Este e-mail ja esta em uso.');
      }
      throw new ConflictException('Este username ja esta em uso.');
    }

    const passwordHash = await this.cryptographyService.hash(password);

    const user = User.create({
      email,
      name,
      username,
      passwordHash,
    });

    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
}
