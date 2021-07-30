import { BaseDto } from './../../../database/entities/base.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { ReviewEntity } from './../../../database/entities/review.entity';
import { Exclude, Expose } from "class-transformer";
import { IsInt, isNotEmptyObject, IsPositive, IsString, IsUUID } from "class-validator";
import { IsNull } from "typeorm";


@Expose()
export class CreateProductDto extends BaseDto {
  
  @IsString()
  name: string;

  @IsString()
  description: string;

  
  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsUUID()
  added_by_admin_id: string;


  @Exclude()
  reviews: ReviewEntity[];

  @Exclude()
  added_by: UserEntity;
}
