import { Body, Controller, Post } from '@nestjs/common';
import { CreateRegistrationDto } from '../dto/create-registration.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RegistrationService } from '../service/registration.service';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Auth()
  @Post()
  create(
    @Body() registration: CreateRegistrationDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.registrationService.create(registration, userId);
  }
}
