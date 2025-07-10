import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import OpenAI from 'openai';
import {
  OotdRoastingAnalysisPrompt,
  OotdRoastingAnalysisSchema,
} from '@gglk/ai/schemas/evaluation.schema';
import { PictureNotFoundException } from '@gglk/picture/exceptions';
import { PictureRepository } from '@gglk/picture/picture.repository';
import { SYSTEM_PROMPT_3 } from './prompt/system-prompt';

@Injectable()
export class AiService {
  private readonly chatModel: ChatOpenAI;
  private readonly client: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly pictureRepository: PictureRepository,
  ) {
    this.chatModel = new ChatOpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
      model: 'gpt-4o-mini',
      temperature: 0,
    });

    this.client = new OpenAI({
      apiKey: this.configService.get('CLOVASTUDIO_API_KEY'),
      baseURL: 'https://clovastudio.stream.ntruss.com/v1/openai', // CLOVA Studio OpenAI 호환 API 엔드포인트 입력
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

    console.log('ootdRoastingPrompt:', ootdRoastingPrompt);

    const completion = await this.client.chat.completions.create({
      model: 'HCX-005',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT_3 },
        { role: 'user', content: pictureInstance.url },
      ],
    });

    console.log(completion.choices[0].message.content ?? '');

    return await this.chatModel
      .withStructuredOutput(OotdRoastingAnalysisSchema)
      .invoke(ootdRoastingPrompt);
  }
}
