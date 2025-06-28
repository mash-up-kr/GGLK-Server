import { EvaluationModuleKey, ModuleErrors } from 'error-types';
import { BaseException } from '@gglk/common';

export class EvaluationNotFoundException extends BaseException {
  constructor() {
    super(
      ModuleErrors[EvaluationModuleKey.EVALUATION_NOT_FOUND].statusCode,
      ModuleErrors[EvaluationModuleKey.EVALUATION_NOT_FOUND].errorMessage,
      EvaluationModuleKey.EVALUATION_NOT_FOUND,
    );
  }
}
