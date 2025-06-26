import { ModuleErrors, UserModuleKey } from 'error-types';
import { BaseException } from '@gglk/common';

export class GuestUserNotFoundException extends BaseException {
  constructor() {
    super(
      ModuleErrors[UserModuleKey.GUEST_USER_NOT_FOUND].statusCode,
      ModuleErrors[UserModuleKey.GUEST_USER_NOT_FOUND].errorMessage,
      UserModuleKey.GUEST_USER_NOT_FOUND,
    );
  }
}
