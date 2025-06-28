import { Module } from '@nestjs/common';
import { AiModule } from '@gglk/ai/ai.module';
import { EvaluationController } from './evaluation.controller';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationService } from './evaluation.service';

@Module({
  imports: [AiModule],
  controllers: [EvaluationController],
  providers: [EvaluationService, EvaluationRepository],
  exports: [EvaluationService],
})
export class EvaluationModule {}
