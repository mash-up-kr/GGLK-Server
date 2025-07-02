import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import {
  OOTD_HASHTAG_MAX_COUNT,
  OOTD_HASHTAG_MAX_LENGTH,
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
    .min(OOTD_TITLE_MIN, {
      message: `제목은 최소 ${OOTD_TITLE_MIN}자 이상이어야 합니다.`,
    })
    .max(OOTD_TITLE_MAX, {
      message: `제목은 최대 ${OOTD_TITLE_MAX}자 이하이어야 합니다.`,
    })
    .describe(
      `주요 로스팅 멘트 (한국어, ${OOTD_TITLE_MIN}~${OOTD_TITLE_MAX}자)`,
    ),
  nickname: z
    .string()
    .max(OOTD_NICKNAME_MAX, {
      message: `별명은 최대 ${OOTD_NICKNAME_MAX}자 이하이어야 합니다.`,
    })
    .describe('재미있는 별명 (한국어)'),
  hashtagList: z
    .array(
      z.string().max(OOTD_HASHTAG_MAX_LENGTH, {
        message: `각 해시태그는 최대 ${OOTD_HASHTAG_MAX_LENGTH}자 이하이어야 합니다.`,
      }),
    )
    .length(OOTD_HASHTAG_MAX_COUNT, {
      message: `해시태그는 정확히 ${OOTD_HASHTAG_MAX_COUNT}개여야 합니다.`,
    })
    .describe(`코디를 로스팅하는 한국어 해시태그 ${OOTD_HASHTAG_MAX_COUNT}개`),
  totalScore: z
    .number()
    .min(OOTD_TOTAL_SCORE_MIN, {
      message: `점수는 최소 ${OOTD_TOTAL_SCORE_MIN}점 이상이어야 합니다.`,
    })
    .max(OOTD_TOTAL_SCORE_MAX, {
      message: `점수는 최대 ${OOTD_TOTAL_SCORE_MAX}점 이하이어야 합니다.`,
    })
    .describe(
      `코디 점수 (${OOTD_TOTAL_SCORE_MIN} ~ ${OOTD_TOTAL_SCORE_MAX}점 사이)`,
    ),
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
      content: systemPrompt,
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
