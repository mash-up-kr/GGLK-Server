import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RunnableLambda, RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import {
  OOTD_ROASTING_MAX_RETRIES,
  OOTD_TITLE_MAX,
  OOTD_TITLE_MIN,
} from '@gglk/ai/ai.contant';
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
      temperature: 0,
    });
  }

  private isResultValid(result: OotdRoastingAnalysisType): boolean {
    const titleLength = result.title.trim().length;
    const nicknameLength = result.nickname.trim().length;
    const hashtagListLength = result.hashtagList.length;
    if (titleLength < OOTD_TITLE_MIN || titleLength > OOTD_TITLE_MAX)
      return false;
    if (nicknameLength > 7) return false;
    if (hashtagListLength < 3 || hashtagListLength > 4) return false;
    return true;
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

  private buildRoastingSequence(imageUrl: string, spicyLevel: number) {
    const ootdRoastParser = StructuredOutputParser.fromZodSchema(
      OotdRoastingAnalysisSchema,
    );

    const ootdRoastingSequence = RunnableLambda.from(() => {
      return OotdRoastingAnalysisPrompt(imageUrl, spicyLevel).formatMessages({
        schemaInstruction: ootdRoastParser.getFormatInstructions(),
      });
    });

    return {
      sequence: RunnableSequence.from([
        ootdRoastingSequence,
        this.chatModel,
        ootdRoastParser,
      ]),
      promptStep: ootdRoastingSequence,
    };
  }

  private async retryUntilValidTitle(
    sequence: RunnableSequence,
  ): Promise<OotdRoastingAnalysisType> {
    let lastResult: OotdRoastingAnalysisType | null = null;

    for (let attempt = 0; attempt < OOTD_ROASTING_MAX_RETRIES; attempt++) {
      const result = (await sequence.invoke({})) as OotdRoastingAnalysisType;
      if (this.isResultValid(result)) {
        return result;
      }
      lastResult = result;
    }

    throw new Error(
      `유효한 글자 수(${OOTD_TITLE_MIN}~${OOTD_TITLE_MAX}자)의 한글 제목을 생성하지 못했습니다. 마지막 시도 결과: ${lastResult?.title}`,
    );
  }

  async invokeAiOotdRoasting(
    pictureId: number,
    spicyLevel: number,
    userId: string,
  ) {
    const pictureInstance = await this.getPictureOrThrow(pictureId, userId);
    const { sequence } = this.buildRoastingSequence(
      pictureInstance.url,
      spicyLevel,
    );
    return this.retryUntilValidTitle(sequence);
  }
}
