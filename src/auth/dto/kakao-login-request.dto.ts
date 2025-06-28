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

  @ApiProperty({
    required: true,
    description: 'Kakao Oauth Code redirected source URI',
  })
  @IsString() // IsUrl이 의도한대로 동작하지 않는듯해서 일단 IsString으로 대체
  @IsNotEmpty()
  redirectUri: string;
}
