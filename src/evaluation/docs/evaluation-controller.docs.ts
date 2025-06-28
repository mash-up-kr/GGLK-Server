import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const EvaluationControllerDocs = applyDecorators(
  ApiTags('Evaluation'),
  ApiBearerAuth(),
);
