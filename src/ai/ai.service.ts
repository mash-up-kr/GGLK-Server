import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  OotdRoastingAnalysisPrompt,
  OotdRoastingAnalysisSchema,
  OotdRoastingAnalysisType,
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
      temperature: 0.7,
      topP: 0.8,
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

  private processHashtags(response: OotdRoastingAnalysisType) {
    return {
      ...response,
      hashtagList: response.hashtagList.map((hashtag) => {
        const trimmed = hashtag.trim();
        return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
      }),
    };
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

    const chatModelResponse = await this.chatModel
      .withStructuredOutput(OotdRoastingAnalysisSchema)
      .invoke(ootdRoastingPrompt);

    const verifiedResponse = this.processHashtags(chatModelResponse);

    return verifiedResponse;
  }
}
