import { ApiProperty } from '@nestjs/swagger';

export class EvaluationResponseDto {
  @ApiProperty()
  id: number;

  constructor(obj: EvaluationResponseDto) {
    this.id = obj.id;
  }
}
