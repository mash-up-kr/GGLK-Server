import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export const KakaoGuestLoginHandlerDocs = applyDecorators(
  ApiBearerAuth(),
  ApiOperation({
    summary: 'Kakao login with guest migration',
    description: 'Guest User를 실제 User로 마이그레이션 하면서 회원가입합니다.',
  }),
);
