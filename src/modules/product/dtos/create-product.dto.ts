import { Category } from './../../../database/entities/category.enum';
import { BaseDto } from './../../../database/entities/base.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { ReviewEntity } from './../../../database/entities/review.entity';
import { Exclude, Expose } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, isNotEmptyObject, IsPositive, IsString, IsUUID } from "class-validator";
import { IsNull } from "typeorm";


@Exclude()
export class CreateProductDto extends BaseDto {
  
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsEnum(Category)
  category: Category;

  @Expose()
  @IsInt()
  @IsPositive()
  price: number;

  @Expose()
  @IsInt()
  @IsPositive()
  quantity: number;
}
