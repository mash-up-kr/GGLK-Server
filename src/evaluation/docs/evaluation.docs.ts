import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import {
  EvaluationModuleKey,
  PictureModuleKey,
  RedisModuleKey,
} from 'error-types';
import { EvaluationItemResponseDto, EvaluationResponseDto } from '../dto';

export const OotdRoastingDocs = applyDecorators(
  ApiOperation({
    summary: 'OOTD Ai Roasting',
    description: 'Image Upload이후 해당 Image의 ID로 요청을 진행해주세요',
  }),
  ApiNotFoundResponse({
    description: `${PictureModuleKey.PICTURE_NOT_FOUND}`,
  }),
  ApiBadRequestResponse({
    description: `${RedisModuleKey.REDIS_BAD_REQUEST}`,
  }),
  ApiResponse({
    status: HttpStatus.OK,
    type: EvaluationResponseDto,
  }),
);

export const GetEvaluationDocs = applyDecorators(
  ApiOperation({
    summary: 'Get Ai Roasted data',
    description: 'Post 허고 이거 쓰쇼잉',
  }),
  ApiNotFoundResponse({
    description: `${EvaluationModuleKey.EVALUATION_NOT_FOUND}`,
  }),
  ApiResponse({
    status: HttpStatus.OK,
    type: EvaluationItemResponseDto,
  }),
);

export const CheckEvaluationDocs = applyDecorators(
  ApiOperation({
    summary: 'Check if guest user use change',
    description: '게스트 유저가 기회 사용했는지 확인',
  }),
  ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'boolean',
    },
  }),
);
