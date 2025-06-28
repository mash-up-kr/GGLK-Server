import { AuthModuleKey, ModuleErrors } from 'error-types';
import { BaseException } from '@gglk/common';

export class KakaoOauthException extends BaseException {
  constructor() {
    super(
      ModuleErrors[AuthModuleKey.KAKAO_OAUTH_ERROR].statusCode,
      ModuleErrors[AuthModuleKey.KAKAO_OAUTH_ERROR].errorMessage,
      AuthModuleKey.KAKAO_OAUTH_ERROR,
    );
  }
}
