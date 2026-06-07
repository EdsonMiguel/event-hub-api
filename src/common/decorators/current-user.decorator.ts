import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/shared/types/jwt-payload.interface';

type RequestWithUser = Request & { user?: JwtPayload };

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
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
