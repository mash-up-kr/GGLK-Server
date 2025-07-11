import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const AiControllerDocs = applyDecorators(ApiTags('Ai'), ApiBearerAuth());
