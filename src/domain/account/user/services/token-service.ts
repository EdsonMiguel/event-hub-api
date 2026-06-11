export interface SignTokenPayload {
  sub: string;
  username: string;
}

export abstract class TokenService {
  abstract sign(payload: SignTokenPayload): string;
}
