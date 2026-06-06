import { AuthenticateDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { forwardRef, Inject, UnauthorizedException } from '@nestjs/common';

import bcrypt from 'bcrypt';
import { UserService } from 'src/module/users/services/user.service';

export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(login: AuthenticateDto) {
    const user = await this.userService.findByUsernameWithPassword(
      login.username,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const isPasswordValid = await bcrypt.compare(login.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
