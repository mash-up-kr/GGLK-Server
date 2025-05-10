import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export enum OrderCondition {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class BasePaginationQueryDto {
  @ApiProperty({
    description: 'Pagination의 Page값입니다. 최소값과 기본값은 1입니다',
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({
    description:
      'Pagination의 Limit값입니다. 최소값은 1이며, 기본값은 10입니다',
    default: 10,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly limit: number = 10;

  @ApiProperty({
    description: 'Pagination의 Order기준입니다. 기본값은 ASC입니다',
    default: OrderCondition.ASC,
    required: false,
  })
  @IsEnum(OrderCondition)
  @IsOptional()
  readonly order: OrderCondition = OrderCondition.ASC;

  // getter: offset
  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
