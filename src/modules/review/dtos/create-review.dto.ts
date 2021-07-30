import { BaseDto } from './../../../database/entities/base.dto';
import { IsIn, IsOptional, IsString, IsUUID } from "class-validator";
import { Expose } from 'class-transformer';


export class CreateReviewDto extends BaseDto{

  @IsUUID()
  product_id: string;

  @IsUUID()
  user_id: string;

  @IsString()
  comment: string;

  @IsOptional()
  @IsIn([1,2,3,4,5])
  rating: number;
}
