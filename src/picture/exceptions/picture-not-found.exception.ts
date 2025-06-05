import { ModuleErrors, PictureModuleKey } from 'error-types';
import { BaseException } from '@gglk/common';

export class PictureNotFoundException extends BaseException {
  constructor() {
    super(
      ModuleErrors[PictureModuleKey.PICTURE_NOT_FOUND].statusCode,
      ModuleErrors[PictureModuleKey.PICTURE_NOT_FOUND],
    );
  }
}
