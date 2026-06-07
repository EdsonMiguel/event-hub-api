import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { AuthenticateUserUseCase } from './use-cases/authenticate.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { AuthController } from './infra/http/auth.controller';
import { UserController } from './infra/http/users.controller';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthenticateUserUseCase,
    CreateUserUseCase,
    GetProfileUseCase,
    JwtStrategy,
  ],
})
export class AccountsModule {}
