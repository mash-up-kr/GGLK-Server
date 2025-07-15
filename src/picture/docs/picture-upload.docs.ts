import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { PictureModuleKey } from 'error-types';

export const PictureUploadDocs = applyDecorators(
  ApiOperation({ summary: '사진 업로드 및 저장' }),
  ApiConsumes('multipart/form-data'),
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  }),
  ApiInternalServerErrorResponse({
    description: `${PictureModuleKey.NCP_NETWORK_ERROR}`,
  }),
  ApiResponse({
    status: HttpStatus.CREATED,
    description: '사진 저장 성공, 저장된 사진의 id와 url 반환',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 123 },
        url: { type: 'string', example: 'https://example.com/image.jpg' },
      },
    },
  }),
);
