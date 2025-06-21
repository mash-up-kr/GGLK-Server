import { Reflector } from '@nestjs/core';
import type { TOKEN_TYPE } from '@gglk/auth/auth.constant';

export const UserType = Reflector.createDecorator<TOKEN_TYPE[]>();
