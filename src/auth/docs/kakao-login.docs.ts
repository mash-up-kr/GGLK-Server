import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const KakaoLoginHandlerDocs = applyDecorators(
  ApiOperation({
    summary: 'Kakao login handler',
  }),
);
