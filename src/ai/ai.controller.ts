import { Controller } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiControllerGuardDefinition } from './decorators';
import { AiControllerDocs } from './docs';

@Controller('ai')
@AiControllerGuardDefinition
@AiControllerDocs
export class AiController {
  constructor(private readonly aiService: AiService) {}
}
