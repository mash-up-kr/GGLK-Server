import { UseGuards, applyDecorators } from '@nestjs/common';
import { Public } from '@gglk/common/decorator/public.decorator';
import { UserType } from '@gglk/common/decorator/user-type.decorator';
import { UserTypeGuard } from '@gglk/common/guard/user-type.guard';
import { JwtAuthGuard } from '../guard/jwt.guard';

export const KakaoLoginHandlerGuardDefinition = applyDecorators(
  UseGuards(JwtAuthGuard, UserTypeGuard),
  UserType(['GUEST', 'USER']),
  Public(),
);
