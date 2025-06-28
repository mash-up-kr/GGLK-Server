import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import type { TOKEN_TYPE } from '@gglk/auth/auth.constant';
import { UserPayload } from '@gglk/auth/auth.interface';
import {
  PublicRouteToken,
  validatePublicRoute,
} from '../decorator/public.decorator';
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
    const publicMetadata = this.reflector.getAllAndMerge(PublicRouteToken, [
      context.getClass(),
      context.getHandler(),
    ]);

    // Public Decorator에 대한 확인
    // 기본적으로 Public Route를 허용해야하는 경우에는 Request User가 없는 경우에 대한 허용이기 때문에 user 없는것을 기본 전제로함
    // 또한 Public Route에서 user가 있는 경우 없는 경우 행동이 달라질 수 있기에 이점 고려
    if (validatePublicRoute(publicMetadata) && !request.user) {
      return true;
    }

    const user = request.user as UserPayload;
    if (!user) {
      console.error(
        '@UserTypeGuard should be defined after @UseGuards(UserGuard)',
      );
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
