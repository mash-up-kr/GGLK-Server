import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty()
  token: string;

  constructor(data: TokenResponseDto) {
    this.token = data.token;
  }
}
