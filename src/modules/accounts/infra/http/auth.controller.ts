import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from '../../use-cases/authenticate.use-case';
import { AuthenticateDto } from './dtos/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post()
  authenticate(@Body() login: AuthenticateDto) {
    return this.authenticateUserUseCase.execute(login);
  }
}
