import { ModuleErrors, RedisModuleKey } from 'error-types';
import { BaseException } from '@gglk/common';

export class RedisBadRequestException extends BaseException {
  constructor() {
    super(
      ModuleErrors[RedisModuleKey.REDIS_BAD_REQUEST].statusCode,
      ModuleErrors[RedisModuleKey.REDIS_BAD_REQUEST].errorMessage,
      RedisModuleKey.REDIS_BAD_REQUEST,
    );
  }
}
