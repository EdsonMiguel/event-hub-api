import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { EventService } from './services/event.service';
import { EventController } from './controller/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UserModule],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
