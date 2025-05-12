import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { EvaluationController } from './evaluation.controller';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationService } from './evaluation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation])],
  controllers: [EvaluationController],
  providers: [EvaluationService, EvaluationRepository],
  exports: [EvaluationService],
})
export class EvaluationModule {}
