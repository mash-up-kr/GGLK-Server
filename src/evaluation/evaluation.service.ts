import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiService } from '@gglk/ai/ai.service';
import { Evaluation } from './entities/evaluation.entity';
import { EvaluationRepository } from './evaluation.repository';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly evaluationRepository: EvaluationRepository,
    private readonly aiService: AiService,
    private readonly configService: ConfigService,
  ) {}

  async findById(id: number) {
    return await this.evaluationRepository.findByIdWithConvertedUrl(
      id,
      this.configService.get('OBJECT_STORAGE_PATTERN') ?? '',
      this.configService.get('CDN_PATTERN') ?? '',
    );
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
