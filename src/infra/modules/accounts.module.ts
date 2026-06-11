import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../../domain/account/user/repositories/users-repository';
import { CryptographyService } from '../../domain/account/user/services/cryptography-service';
import { TokenService } from '../../domain/account/user/services/token-service';
import { AuthenticateUserUseCase } from '../../domain/account/user/use-cases/authenticate-user-use-case';
import { CreateUserUseCase } from '../../domain/account/user/use-cases/create-user-use-case';
import { GetProfileUseCase } from '../../domain/account/user/use-cases/get-profile-use-case';
import { JwtTokenService } from '../auth/jwt-token-service';
import { BcryptCryptographyService } from '../cryptography/bcrypt-cryptography-service';
import { TypeOrmUsersRepository } from '../database/repositories/typeorm-users-repository';
import { TypeOrmUserEntity } from '../database/schemas/typeorm-user-entity';
import { AuthController } from '../http/controllers/accounts/auth/auth.controller';
import { UserController } from '../http/controllers/accounts/user/user.controller';
import { JwtStrategy } from '../http/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
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
    {
      provide: UsersRepository,
      useClass: TypeOrmUsersRepository,
    },
    {
      provide: CryptographyService,
      useClass: BcryptCryptographyService,
    },
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
  ],
})
export class AccountsModule {}
