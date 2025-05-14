import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from './evaluation.repository';

@Injectable()
export class EvaluationService {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}
}
