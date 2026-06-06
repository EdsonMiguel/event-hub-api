import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/shared/types/jwt-payload.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return null;
    }
    if (data) {
      return user[data];
    }
    return user;
  },
);
