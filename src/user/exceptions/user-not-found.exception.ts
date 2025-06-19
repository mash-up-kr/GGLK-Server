import { ModuleErrors, UserModuleKey } from 'error-types';
import { BaseException } from '@gglk/common';

export class UserNotFoundException extends BaseException {
  constructor() {
    super(
      ModuleErrors[UserModuleKey.USER_NOT_FOUND].statusCode,
      ModuleErrors[UserModuleKey.USER_NOT_FOUND].errorMessage,
      UserModuleKey.USER_NOT_FOUND,
    );
  }
}
