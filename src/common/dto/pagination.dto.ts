import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number = 20;
}

export class PaginatedResponse<T> {
  @ApiProperty({ isArray: true })
  data!: T[];
  total!: number;
  page!: number;
  limit!: number;
}
