import { Injectable } from '@nestjs/common';
import { AiService } from '@gglk/ai/ai.service';
import { Evaluation } from './entities/evaluation.entity';
import { EvaluationRepository } from './evaluation.repository';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly evaluationRepository: EvaluationRepository,
    private readonly aiService: AiService,
  ) {}

  async findById(id: number) {
    return await this.evaluationRepository.findOne({
      where: { id },
      relations: { picture: true },
    });
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
