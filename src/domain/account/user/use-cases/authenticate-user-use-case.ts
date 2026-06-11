import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { CryptographyService } from '../services/cryptography-service';
import { TokenService } from '../services/token-service';

interface AuthenticateUserRequest {
  username: string;
  password: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptographyService: CryptographyService,
    private readonly tokenService: TokenService,
  ) {}

  async execute({ username, password }: AuthenticateUserRequest) {
    const user =
      await this.usersRepository.findOneByUsernameWithPassword(username);

    if (!user) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    const isPasswordValid = await this.cryptographyService.compare(
      password,
      user.getPasswordHash(),
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    return {
      access_token: this.tokenService.sign({
        sub: user.id,
        username: user.username,
      }),
    };
  }
}
