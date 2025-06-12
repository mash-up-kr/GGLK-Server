import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { PictureModuleKey } from 'error-types';
import { OotdRoastingResponseDto } from '../dto';

export const OotdRoastingDocs = applyDecorators(
  ApiOperation({
    summary: 'OOTD Ai Roasting',
    description: 'Image Upload이후 해당 Image의 ID로 요청을 진행해주세요',
  }),
  ApiNotFoundResponse({
    description: `${PictureModuleKey.PICTURE_NOT_FOUND}`,
  }),
  ApiResponse({
    status: HttpStatus.OK,
    type: OotdRoastingResponseDto,
  }),
);
