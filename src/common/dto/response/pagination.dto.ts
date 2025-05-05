import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

/**
 * Metadata for pagination
 */
export class PaginationMetadata {
  @Exclude()
  private _page: number;

  @Exclude()
  private _limit: number;

  @Exclude()
  private _total: number;

  @Exclude()
  private _lastPage: number;

  @Exclude()
  private _nextPage: number | null;

  constructor(page: number, limit: number, total: number) {
    this._page = page;
    this._limit = limit;
    this._total = total;
    this._lastPage = Math.ceil(this._total / this._limit);
    this._nextPage = this._page < this._lastPage ? this._page + 1 : null;
  }

  @Expose()
  @ApiProperty({
    type: Boolean,
  })
  get hasPrev(): boolean {
    return this._page > 1;
  }

  @Expose()
  @ApiProperty({
    type: Boolean,
  })
  get hasNext(): boolean {
    return Boolean(this._nextPage);
  }

  @Expose()
  @ApiProperty({
    type: Number,
  })
  get total(): number {
    return this._total;
  }
}

/**
 * Base Pagination Response
 */
export abstract class BasePaginationResponse<T> {
  @ApiProperty({
    type: PaginationMetadata,
  })
  metadata: PaginationMetadata;

  data: T[];

  constructor(page: number, limit: number, count: number, data: T[]) {
    this.metadata = new PaginationMetadata(page, limit, count);
    this.data = data;
  }
}
