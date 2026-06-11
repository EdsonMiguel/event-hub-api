import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';

@Injectable()
export class GetProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    return user;
  }
}
