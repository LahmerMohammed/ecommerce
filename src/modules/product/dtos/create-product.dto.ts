import { Category } from './../../../database/entities/category.enum';
import { BaseDto } from './../../../database/entities/base.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { ReviewEntity } from './../../../database/entities/review.entity';
import { Exclude, Expose } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, isNotEmptyObject, IsPositive, IsString, IsUUID } from "class-validator";
import { IsNull } from "typeorm";


@Expose()
export class CreateProductDto extends BaseDto {
  
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(Category)
  Category: Category;

  
  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  /** should be excluded also , extract it from jwt */
  @Exclude()
  added_by_user_id: string;

  @Exclude()
  reviews: ReviewEntity[];

  @Exclude()
  added_by: UserEntity;
}
