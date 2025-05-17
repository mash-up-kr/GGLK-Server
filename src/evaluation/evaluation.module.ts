import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationService } from './evaluation.service';

@Module({
  imports: [],
  controllers: [EvaluationController],
  providers: [EvaluationService, EvaluationRepository],
  exports: [EvaluationService],
})
export class EvaluationModule {}
