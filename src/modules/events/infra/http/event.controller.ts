import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateEventUseCase } from '../../use-cases/create-event.use-case';
import { CreateEventDto } from './dtos/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly createEventUseCase: CreateEventUseCase) {}

  @Auth()
  @Post()
  create(@Body() event: CreateEventDto, @CurrentUser('userId') userId: string) {
    this.createEventUseCase.execute(
      {
        ...event,
      },
      userId,
    );
  }
}
