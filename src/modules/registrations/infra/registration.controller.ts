import { Controller, Param, Post } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { EnrollInEventUseCase } from '../use-cases/enroll-in-event.use-case';

@Controller('')
export class RegistrationController {
  constructor(private readonly enrollInEventUseCase: EnrollInEventUseCase) {}

  @Auth()
  @Post('/event/:eventId/register')
  async enrollInEvent(
    @Param('eventId') eventId: string,
    @CurrentUser('userId') userId: string,
  ) {
    return await this.enrollInEventUseCase.execute({ eventId }, userId);
  }
}
