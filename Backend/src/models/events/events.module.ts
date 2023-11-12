import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { OperatorsModule } from '../operstors/operators.module';
import { EventsController } from './events.controller';
import { eventsProviders } from './events.providers';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';
import { Event, EventSchema } from './schemas/events.schema';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => OperatorsModule),
    BullModule.registerQueue({
      name: 'stats-calculation-queue',
    }),
    // MongooseModule.forFeatureAsync(
    //   [
    //     {
    //       name: Event.name,
    //       useFactory: () => {
    //         const schema = EventSchema;
    //         schema.post<Event>('save', function () {
    //           const event = this;
    //           if (event.presence !== 1) {
    //             console.log('Absence event for ' + event.personId);
    //           }
    //         });
    //         return schema;
    //       },
    //     },
    //   ],
      
    // ),
  ],
  controllers: [EventsController],
  providers: [EventsRepository, EventsService, ...eventsProviders],
  exports: [EventsRepository, EventsService, ...eventsProviders],
})
export class EventsModule {}
