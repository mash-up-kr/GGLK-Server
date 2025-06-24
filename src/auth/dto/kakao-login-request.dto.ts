import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class KakakoLoginRequestDto {
  @ApiProperty({
    required: true,
    description: 'Kakao Oauth Code',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
