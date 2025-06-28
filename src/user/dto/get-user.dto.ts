import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseDto {
  @ApiProperty()
  isGuest: boolean;

  @ApiProperty({ required: false, nullable: true })
  id?: string;

  @ApiProperty({ required: false, nullable: true })
  name?: string;

  @ApiProperty({ required: false, nullable: true })
  joinedAt?: Date;

  constructor(user: GetUserResponseDto) {
    this.isGuest = user.isGuest;
    this.id = user?.id;
    this.name = user?.name;
    this.joinedAt = user?.joinedAt;
  }
}
