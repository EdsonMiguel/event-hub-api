import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { RegistrationModule } from './registrations/registration.module';
import { EventModule } from './events/event.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, EventModule, RegistrationModule, UserModule],
})
export class AppModule {}
