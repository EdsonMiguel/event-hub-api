import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthenticateDto } from '../dto/login.dto';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  authenticate(@Body() login: AuthenticateDto) {
    return this.authService.authenticate(login);
  }

  @Auth()
  @Get('test')
  testAuth() {
    return 'ok';
  }
}
