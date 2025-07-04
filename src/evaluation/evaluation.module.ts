import { Module } from '@nestjs/common';
import { AiModule } from '@gglk/ai/ai.module';
import { RedisModule } from '@gglk/redis/redis.module';
import { EvaluationController } from './evaluation.controller';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationService } from './evaluation.service';

@Module({
  imports: [AiModule, RedisModule],
  controllers: [EvaluationController],
  providers: [EvaluationService, EvaluationRepository],
  exports: [EvaluationService],
})
export class EvaluationModule {}
