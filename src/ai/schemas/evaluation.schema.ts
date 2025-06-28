import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import {
  OOTD_HASHTAG_MAX_COUNT,
  OOTD_HASHTAG_MAX_LENGTH,
  OOTD_HASHTAG_MIN_COUNT,
  OOTD_NICKNAME_MAX,
  OOTD_TITLE_MAX,
  OOTD_TITLE_MIN,
  OOTD_TOTAL_SCORE_MAX,
  OOTD_TOTAL_SCORE_MIN,
} from '@gglk/ai/ai.contant';
import {
  SYSTEM_PROMPT_1,
  SYSTEM_PROMPT_2,
  SYSTEM_PROMPT_3,
} from '@gglk/ai/prompt/system-prompt';

export const OotdRoastingAnalysisSchema = z.object({
  title: z
    .string()
    .min(OOTD_TITLE_MIN, { message: 'title must be at least 25 characters' })
    .max(OOTD_TITLE_MAX, { message: 'title must be at most 33 characters' })
    .describe('main roast title (Korean, 25~33 characters)'),
  nickname: z
    .string()
    .max(OOTD_NICKNAME_MAX, {
      message: 'nickname must be at most 7 characters',
    })
    .describe('funny nickname (Korean)'),
  hashtagList: z
    .array(
      z.string().max(OOTD_HASHTAG_MAX_LENGTH, {
        message: 'Each hashtag must be at most 20 characters',
      }),
    )
    .min(OOTD_HASHTAG_MIN_COUNT, {
      message: 'At least 3 hashtags are required',
    })
    .max(OOTD_HASHTAG_MAX_COUNT, { message: 'At most 4 hashtags are allowed' })
    .describe('3 to 4 Korean hashtags roasting the outfit'),
  totalScore: z
    .number()
    .min(OOTD_TOTAL_SCORE_MIN, { message: 'Score ootd between 10 ~ 100' })
    .max(OOTD_TOTAL_SCORE_MAX, { message: 'Score ootd between 10 ~ 100' })
    .describe('Score ootd between 10 ~ 100'),
});

export type OotdRoastingAnalysisType = z.infer<
  typeof OotdRoastingAnalysisSchema
>;

export function OotdRoastingAnalysisPrompt(uri: string, spicyLevel: number) {
  const systemPrompt: string =
    spicyLevel === 1
      ? SYSTEM_PROMPT_1
      : spicyLevel === 2
        ? SYSTEM_PROMPT_2
        : SYSTEM_PROMPT_3;

  return ChatPromptTemplate.fromMessages([
    {
      role: 'system',
      content: systemPrompt.trim(),
    },
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: { url: uri },
        },
      ],
    },
  ]);
}
