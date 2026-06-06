import { Body, Controller, Post } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event-dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Auth()
  @Post()
  create(@Body() event: CreateEventDto, @CurrentUser('userId') userId: string) {
    this.eventService.create(
      {
        ...event,
      },
      userId,
    );
  }
}
