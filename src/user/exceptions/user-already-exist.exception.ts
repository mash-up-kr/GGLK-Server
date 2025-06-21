import { ModuleErrors, UserModuleKey } from 'error-types';
import { BaseException } from '@gglk/common';

export class UserAlreadyExistsException extends BaseException {
  constructor() {
    super(
      ModuleErrors[UserModuleKey.USER_ALREADY_EXISTS].statusCode,
      ModuleErrors[UserModuleKey.USER_ALREADY_EXISTS].errorMessage,
      UserModuleKey.USER_ALREADY_EXISTS,
    );
  }
}
