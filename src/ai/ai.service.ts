import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RunnableLambda, RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PictureNotFoundException } from '@gglk/picture/exceptions';
import { PictureRepository } from '@gglk/picture/picture.repository';
import {
  type OotdRoastingAnalysiType,
  OotdRoastingAnalysisPrompt,
  OotdRoastingAnalysisSchema,
} from './schemas/evaluation.schema';

@Injectable()
export class AiService {
  private readonly chatModel: ChatOpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly pictureRepositor: PictureRepository,
  ) {
    this.chatModel = new ChatOpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
      model: 'gpt-4o-mini',
      temperature: 0,
    });
  }

  async invokeAiOotdRoasting(
    pictrueId: number,
    spicyLevel: number,
  ): Promise<OotdRoastingAnalysiType> {
    const pictureInstance = await this.pictureRepositor.findOne({
      where: {
        id: pictrueId,
      },
      select: {
        url: true,
      },
    });

    if (!pictureInstance) {
      throw new PictureNotFoundException();
    }

    const ootdRoastingParser = StructuredOutputParser.fromZodSchema(
      OotdRoastingAnalysisSchema,
    );

    const ootdRoastingSequence = RunnableSequence.from([
      RunnableLambda.from(() => {
        return OotdRoastingAnalysisPrompt(
          pictureInstance.url,
          spicyLevel,
        ).formatMessages({
          schemaInstruction: ootdRoastingParser.getFormatInstructions(),
        });
      }),
      this.chatModel,
      ootdRoastingParser,
    ]);
    return await ootdRoastingSequence.invoke({});
  }
}
