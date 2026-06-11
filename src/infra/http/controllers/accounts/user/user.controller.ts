import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../../domain/account/user/use-cases/create-user-use-case';
import { GetProfileUseCase } from '../../../../../domain/account/user/use-cases/get-profile-use-case';
import { Auth } from '../../../decorators/auth.decorator';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { CreateUserDto } from '../../../dtos/create-user.dto';
import { UserPresenter } from '../../../presenters/user-presenter';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
  ) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.createUserUseCase.execute(user);

    return UserPresenter.toHTTP(createdUser);
  }

  @Auth()
  @Get('me')
  async getProfile(@CurrentUser('userId') userId: string) {
    const user = await this.getProfileUseCase.execute(userId);

    return UserPresenter.toHTTP(user);
  }
}
