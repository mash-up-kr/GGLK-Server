import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({
    required: false,
    description:
      'User가 Guest User로 사용하다가 Oauth 로그인시 guest user id를 함께 주어 실제 사용자로 변경하기 위함입니다.',
  })
  @IsString()
  @IsOptional()
  guestUserId?: string;
}
