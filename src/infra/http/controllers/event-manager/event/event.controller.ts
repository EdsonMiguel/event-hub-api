import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEventUseCase } from '../../../../../domain/event-manager/event/use-cases/create-event-use-case';
import { GetEventsUseCase } from '../../../../../domain/event-manager/event/use-cases/get-events-use-case';
import { Auth } from '../../../decorators/auth.decorator';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { CreateEventDto } from '../../../dtos/create-event.dto';
import { EventPresenter } from '../../../presenters/event-presenter';

@Controller('event')
export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getEventsUseCase: GetEventsUseCase,
  ) {}

  @Auth()
  @Post()
  async create(
    @Body() event: CreateEventDto,
    @CurrentUser('userId') userId: string,
  ) {
    const createdEvent = await this.createEventUseCase.execute({
      ...event,
      organizerId: userId,
    });

    return EventPresenter.toHTTP(createdEvent);
  }

  @Get()
  async find() {
    const events = await this.getEventsUseCase.execute();

    return events.map(EventPresenter.toHTTP);
  }
}
