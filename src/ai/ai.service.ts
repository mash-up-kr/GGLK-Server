import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  OotdRoastingAnalysisPrompt,
  OotdRoastingAnalysisSchema,
} from '@gglk/ai/schemas/evaluation.schema';
import { PictureNotFoundException } from '@gglk/picture/exceptions';
import { PictureRepository } from '@gglk/picture/picture.repository';

@Injectable()
export class AiService {
  private readonly chatModel: ChatOpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly pictureRepository: PictureRepository,
  ) {
    this.chatModel = new ChatOpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
      model: 'gpt-4o-mini',
      temperature: 0,
    });
  }

  private async getPictureOrThrow(pictureId: number, userId: string) {
    const picture = await this.pictureRepository.findOne({
      where: {
        id: pictureId,
        user: { id: userId },
      },
      select: {
        url: true,
        id: true,
        user: { id: true },
      },
    });

    if (!picture) throw new PictureNotFoundException();
    return picture;
  }

  async invokeAiOotdRoasting(
    pictureId: number,
    spicyLevel: number,
    userId: string,
  ) {
    const pictureInstance = await this.getPictureOrThrow(pictureId, userId);

    const ootdRoastingPrompt = await OotdRoastingAnalysisPrompt(
      pictureInstance.url,
      spicyLevel,
    ).formatMessages({});

    return await this.chatModel
      .withStructuredOutput(OotdRoastingAnalysisSchema)
      .invoke(ootdRoastingPrompt);
  }
}
