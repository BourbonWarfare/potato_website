import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationaParams {
  @IsOptional()
  @IsMongoId()
  startId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}
