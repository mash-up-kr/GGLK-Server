import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const PictureControllerDocs = applyDecorators(
  ApiTags('Picture'),
  ApiBearerAuth(),
);
