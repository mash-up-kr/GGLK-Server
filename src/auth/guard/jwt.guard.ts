import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PublicRouteToken } from '@gglk/common/decorator/public.decorator';
import { JWT_STRATEGY_TOKEN } from '../auth.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_TOKEN) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * For non-authorized routes
     *
     * Guest, User Type 토큰 둘다 필요 없이 완전히 개방형 API인지에 대해 판별하기 위한 메타데이터입니다.
     * src/common/decorator/public.decorator 참고
     */
    const publicMetadata = this.reflector.getAllAndMerge(PublicRouteToken, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (
      (Array.isArray(publicMetadata) && publicMetadata.length) ||
      typeof publicMetadata === 'boolean'
    ) {
      return true;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
