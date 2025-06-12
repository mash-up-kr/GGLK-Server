import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { PictureModuleKey } from 'error-types';

export const PictureDeleteDocs = applyDecorators(
  ApiOperation({ summary: '사진 삭제' }),
  ApiParam({
    name: 'id',
    description: '사진의 ID',
    type: Number,
  }),
  ApiInternalServerErrorResponse({
    description: `${PictureModuleKey.NCP_NETWORK_ERROR}`,
  }),
  ApiNotFoundResponse({
    description: `${PictureModuleKey.PICTURE_NOT_FOUND}`,
  }),
  ApiResponse({
    status: HttpStatus.OK,
    description: '사진 삭제 성공, 반환값 없음',
  }),
);
