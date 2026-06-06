import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { EventModule } from '../events/event.module';
import { UserModule } from '../users/user.module';
import { RegistrationController } from './controller/registration.controller';
import { RegistrationService } from './service/registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([Registration]), EventModule, UserModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
