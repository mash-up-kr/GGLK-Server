import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetUserResponseDto } from '../dto';

export const GetUserDocs = applyDecorators(
  ApiOperation({
    summary: 'Get user info',
    description:
      'Get user info. If user is guest, return only `is_Guest` true and other properties may be null',
  }),
  ApiOkResponse({
    type: GetUserResponseDto,
  }),
);
