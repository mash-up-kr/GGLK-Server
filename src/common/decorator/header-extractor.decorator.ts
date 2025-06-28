import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const RequestHeader = createParamDecorator(
  /**
   * Return entire header
   *
   * or if define specific property it will return value of defined property from header
   *
   * e.g) @RequestHeader('x-guest-user-id')
   */
  (property: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const headers = request.headers;
    if (!property) {
      return headers;
    }
    return headers?.[property];
  },
);
