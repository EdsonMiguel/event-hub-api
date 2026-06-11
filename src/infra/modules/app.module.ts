import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import { DatabaseModule } from '../database/database.module';
import { AccountsModule } from './accounts.module';
import { EventsModule } from './events.module';
import { RegistrationsModule } from './registrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.required(),
        DB_PORT: Joi.number().default(5432),
        DB_DATABASE: Joi.required(),
        DB_USER: Joi.required(),
        DB_PASS: Joi.required(),
        DB_AUTO_LOAD: Joi.number().min(0).max(1).default(0),
        DB_SYNC: Joi.number().min(0).max(1).default(0),
      }),
    }),
    DatabaseModule,
    AccountsModule,
    EventsModule,
    RegistrationsModule,
  ],
})
export class AppModule {}
