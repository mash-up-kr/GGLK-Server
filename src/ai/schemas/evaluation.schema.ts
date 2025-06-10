import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

export const OotdRoastingAnalysisSchema = z.object({
  title: z.string().describe('main roast title (2+ lines, Korean)'),
  nickname: z.string().describe('funny nickname (Korean)'),
  hashtagList: z
    .array(z.string())
    .describe('3 to 5 Korean hashtags roasting the outfit'),
  totalScore: z
    .number()
    .min(10)
    .max(100)
    .describe('Score ootd between 10 ~ 100'),
});

export type OotdRoastingAnalysiType = z.infer<
  typeof OotdRoastingAnalysisSchema
>;

export function OotdRoastingAnalysisPrompt(uri: string, spicyLevel: number) {
  /**
   * LCEL Variable
   *
   * - schemaInstruction: Zod Schema
   *
   */
  return ChatPromptTemplate.fromMessages([
    {
      role: 'system',
      content: `
You are an OOTD (Outfit of the Day) roaster.

The user will provide an outfit image. Your job is to roast the outfit, the user can choose the level of spiciness (1 to 3), which controls how harsh the roast is.

- Level 1: Gentle and cute jokes

- Level 2: Slightly pointed, with some stingers

- Level 3: Strong sarcasm and exaggerated humor

Create a main roast title that is written in Korean and consists of 2 or more lines. The title should be dramatic, sarcastic, or funny — as if it's a teaser headline or meme caption about the outfit.

Generate 3 to 5 Korean hashtags that roast the outfit. These hashtags should be witty, funny, and bold — like meme-style fashion tags that exaggerate the outfit's impression.

Also, give a funny Korean nickname that matches the outfit.

Additionally, give a total score (1 to 100) that reflects how strong or ridiculous the overall impression of the outfit is, regardless of fashion standards. This score should be funny or dramatic, not serious.

REMEMBER YOU SHOULD REPLY IN KOREAN!!

Response format:
{schemaInstruction}
`,
    },
    {
      role: 'assistant',
      content: `
    ex) 
      - "사람들의 시선 강탈! 이 룩이면 최소 두 번은 돌아본다."
      - "거리 캐스팅 각. 이 옷 입고 걷다가 잡혀갈 수도 있음 (촬영장으로)."
      - "첫인상에서 다 했다. 이 룩이면 대화 시작 전부터 호감도 +80."
      - "'그 옷 어디서 샀니?'라는 말 대신 '이건 좀…'이 나올 확률과의 싸움."
      - "상의+하의+신발+액세서리 = 퍼즐 맞춘 듯한 조화."
      - "더우면 더운 대로, 추우면 추운 대로 패션은 포기 못 하지."
      - "맘에 들었지? 빨래 안 마르면 한 번 더 간다."
    `,
    },
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: { url: uri },
        },
        {
          type: 'text',
          text: 'Evaluate photo with spicy level: ' + spicyLevel,
        },
      ],
    },
  ]);
}
