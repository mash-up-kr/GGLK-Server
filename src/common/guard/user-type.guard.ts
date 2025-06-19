import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import type { TOKEN_TYPE } from '@gglk/auth/auth.constant';
import { UserPayload } from '@gglk/auth/auth.interface';
import { UserType } from '../decorator/user-type.decorator';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    /**
     * UserTypeGuard
     *
     * Check if user's token type is valid for context requested route
     * This decorator SHOULD be used after UserGuard decorator
     */
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as UserPayload;
    if (!user) {
      console.error('@UserGuard should be defined after @UseGuards(UserGuard)');
      return false;
    }
    const { tokenType } = user;

    const requiredTypes = this.reflector.getAllAndMerge<TOKEN_TYPE[]>(
      UserType,
      [context.getHandler(), context.getClass()],
    );
    return requiredTypes.includes(tokenType);
  }
}
