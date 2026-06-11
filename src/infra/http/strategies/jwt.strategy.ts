import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtStrategyPayload {
  sub: string;
  username: string;
}

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'key',
    });
  }

  async validate(payload: JwtStrategyPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
