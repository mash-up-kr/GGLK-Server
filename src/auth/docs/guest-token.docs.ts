import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TokenResponseDto } from '../dto';

export const GuestTokenDocs = applyDecorators(
  ApiOperation({
    summary: 'Issue guest token',
    description: 'Issue guest token',
  }),
  ApiOkResponse({
    type: TokenResponseDto,
  }),
);
