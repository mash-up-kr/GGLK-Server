import { ModuleErrors, PictureModuleKey } from 'error-types';
import { BaseException } from '@gglk/common';

export class NCPNetworkErrorException extends BaseException {
  constructor() {
    super(
      ModuleErrors[PictureModuleKey.NCP_NETWORK_ERROR].statusCode,
      ModuleErrors[PictureModuleKey.NCP_NETWORK_ERROR].errorMessage,
      PictureModuleKey.NCP_NETWORK_ERROR,
    );
  }
}
