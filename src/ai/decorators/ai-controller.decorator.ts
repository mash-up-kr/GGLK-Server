import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '@gglk/auth/guard/jwt.guard';
import { UserType } from '@gglk/common/decorator/user-type.decorator';
import { UserTypeGuard } from '@gglk/common/guard/user-type.guard';

export const AiControllerGuardDefinition = applyDecorators(
  UserType(['USER', 'GUEST']),
  UseGuards(JwtAuthGuard, UserTypeGuard),
);
