import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const UserControllerDocs = applyDecorators(
  ApiTags('User'),
  ApiBearerAuth(),
);
