import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export const KakaoLoginHandlerDocs = applyDecorators(
  ApiBearerAuth(),
  ApiOperation({
    summary: 'Kakao login handler',
    description: `
Kakao login handler입니다. 

Case 1. 만약 Guest User Token을 통해서(Authorization 토큰) request 되는 경우에는 Guest User를 실제 User로 마이그레이션을 합니다.

Case 2. 만약 순수 로그인이라면 Authorization 토큰 없이 요청을 하면 됩니다.
    `,
  }),
);
