import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiHeaders } from '@nestjs/swagger';
import { createEventSchema } from 'src/common/constants/joi-validation-schemas';
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@ApiHeaders([{ name: 'x-auth-api-key' }, { name: 'x-auth-api-secret' }])
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(
    @Body(new JoiValidationPipe(createEventSchema))
    createEventDto: CreateEventDto,
    @Body('decoded')apiClient
  ) {
    createEventDto.owner =  apiClient.id;
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  async getEvents() {
    return this.eventsService.getEvents();
  }
}
