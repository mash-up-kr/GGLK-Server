import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export const KakaoLoginHandlerDocs = applyDecorators(
  ApiBearerAuth(),
  ApiOperation({
    summary: 'Kakao login handler',
    description:
      'Kakao login handler입니다. Kakao Login 이전에 Guest User ID 발급이 필요합니다.',
  }),
);
