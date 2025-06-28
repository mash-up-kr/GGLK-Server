import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

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
