import { Controller, Param, Post } from '@nestjs/common';
import { EnrollInEventUseCase } from '../../../../../domain/event-manager/registration/use-cases/enroll-in-event-use-case';
import { Auth } from '../../../decorators/auth.decorator';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { RegistrationPresenter } from '../../../presenters/registration-presenter';

@Controller('')
export class RegistrationController {
  constructor(private readonly enrollInEventUseCase: EnrollInEventUseCase) {}

  @Auth()
  @Post('/event/:eventId/register')
  async enrollInEvent(
    @Param('eventId') eventId: string,
    @CurrentUser('userId') userId: string,
  ) {
    const registration = await this.enrollInEventUseCase.execute({
      eventId,
      userId,
    });

    return RegistrationPresenter.toHTTP(registration);
  }
}
