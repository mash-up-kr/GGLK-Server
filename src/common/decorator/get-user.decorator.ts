import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from '@gglk/auth/auth.interface';

export const GetUser = createParamDecorator(
  (property: keyof UserPayload, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayload;

    // Extract specific property from context user
    if (!property) {
      return user;
    }
    return user?.[property];
  },
);
