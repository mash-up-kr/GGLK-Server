import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { EvaluationModuleKey, PictureModuleKey } from 'error-types';
import { EvaluationItemResponseDto, EvaluationResponseDto } from '../dto';

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
    type: EvaluationResponseDto,
  }),
);

export const GetEvaluationDocs = applyDecorators(
  ApiOperation({
    summary: 'OOTD Ai Roasting',
    description: 'Image Upload이후 해당 Image의 ID로 요청을 진행해주세요',
  }),
  ApiNotFoundResponse({
    description: `${EvaluationModuleKey.EVALUATION_NOT_FOUND}`,
  }),
  ApiResponse({
    status: HttpStatus.OK,
    type: EvaluationItemResponseDto,
  }),
);
