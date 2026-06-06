import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { RegistrationModule } from './registrations/registration.module';
import { EventModule } from './events/event.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';

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
    AuthModule,
    EventModule,
    RegistrationModule,
    UserModule,
  ],
})
export class AppModule {}
