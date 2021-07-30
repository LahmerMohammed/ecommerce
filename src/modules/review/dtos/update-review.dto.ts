import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateReviewDto } from './create-review.dto';


@Exclude()
export class UpdateReviewtDto  {

  @Expose()
  @IsString()
  comment: string;

  @Expose()
  @IsOptional()
  @IsIn([1,2,3,4,5])
  rating: number;
}
