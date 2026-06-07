import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../use-cases/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GetProfileUseCase } from '../../use-cases/get-profile.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
  ) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.createUserUseCase.execute(user);
  }

  @Auth()
  @Get('me')
  async getProfile(@CurrentUser('userId') userId: string) {
    return await this.getProfileUseCase.execute(userId);
  }
}
