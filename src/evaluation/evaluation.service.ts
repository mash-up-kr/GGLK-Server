import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { AiService } from '@gglk/ai/ai.service';
import { Evaluation } from './entities/evaluation.entity';
import { EvaluationRepository } from './evaluation.repository';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly evaluationRepository: EvaluationRepository,
    private readonly aiService: AiService,
  ) {}

  async create(item: DeepPartial<Evaluation>) {
    return await this.evaluationRepository.save(item);
  }

  async createWithRoasting(
    pictrueId: number,
    spicyLevel: number,
    userId: string,
  ): Promise<Evaluation> {
    const invokedRes = await this.aiService.invokeAiOotdRoasting(
      pictrueId,
      spicyLevel,
      userId,
    );

    return await this.evaluationRepository.save({
      ...invokedRes,
      picture: { id: pictrueId },
    });
  }
}
