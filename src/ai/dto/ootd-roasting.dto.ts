import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { OotdRoastingAnalysiType } from '../schemas/evaluation.schema';

export class OotdRoastingRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  imageId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(3)
  spicyLevel: number = 1;
}

// Schema가 변경되거나 필드가 추가되었을때 강제로 implement혹은 변경사항에 맞추도록 하기 위해 implements함
// Langchain.js에서는 Zod Schema Validation을 추가로 하기 때문에 별도 Optional 추가 하지 않음
export class OotdRoastingResponseDto implements OotdRoastingAnalysiType {
  @ApiProperty({
    type: 'string',
    description: 'Ootd picture evaluation title',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'Ootd picture evaluation nickname',
  })
  nickname: string;

  @ApiProperty({
    type: [String],
    description: 'Ootd picture evaluation hashtags',
  })
  hashtagList: string[];

  @ApiProperty({
    type: 'number',
    description: 'Ootd picture evaluation total score',
  })
  totalScore: number;

  constructor(obj: OotdRoastingResponseDto) {
    // 혹시라도 해당 프로퍼티가 없을 수 있는경우를 대비함
    this.title = obj.title;
    this.nickname = obj.nickname;
    this.hashtagList = obj.hashtagList;
    this.totalScore = obj.totalScore;
  }
}
