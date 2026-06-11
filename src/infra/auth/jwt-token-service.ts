import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  SignTokenPayload,
  TokenService,
} from '../../domain/account/user/services/token-service';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: SignTokenPayload): string {
    return this.jwtService.sign(payload);
  }
}
