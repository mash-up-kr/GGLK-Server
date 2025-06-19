import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseDto {
  @ApiProperty()
  isGuest: boolean;

  @ApiProperty()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  joinedAt?: Date;

  constructor(user: GetUserResponseDto) {
    this.isGuest = user.isGuest;
    this.id = user?.id;
    this.name = user?.name;
    this.joinedAt = user?.joinedAt;
  }
}
