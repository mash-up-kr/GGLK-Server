import { Controller } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationsService: EvaluationService) {}
}
