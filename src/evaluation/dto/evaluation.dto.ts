import { ApiProperty } from '@nestjs/swagger';
import { Picture } from '@gglk/picture/entities/picture.entity';
import { Evaluation } from '../entities/evaluation.entity';

export class EvaluationResponseDto {
  @ApiProperty()
  id: number;

  constructor(obj: EvaluationResponseDto) {
    this.id = obj.id;
  }
}

export class EvaluationItemResponseDto
  implements Omit<Evaluation, 'createdAt' | 'updatedAt' | 'isDeleted'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty({ type: [String] })
  hashtagList: string[];

  @ApiProperty()
  totalScore: number;

  @ApiProperty()
  picture: Picture;

  constructor(obj: Evaluation) {
    this.id = obj.id;
    this.title = obj.title;
    this.nickname = obj.nickname;
    this.hashtagList = obj.hashtagList;
    this.totalScore = obj.totalScore;
    this.picture = obj.picture;
  }
}
