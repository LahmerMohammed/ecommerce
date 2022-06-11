import { Category } from './../../../database/entities/category.enum';
import { BaseDto } from './../../../database/entities/base.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { ReviewEntity } from './../../../database/entities/review.entity';
import { Exclude, Expose, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, isArray, IsEnum, IsInt, IsNotEmpty, isNotEmptyObject, IsPositive, IsString, IsUUID, Validate, ValidateNested } from "class-validator";
import { IsNull } from "typeorm";

//test

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
  regular_price: number;

  @Expose()
  @IsInt()
  @IsPositive()
  sale_price: number;

  @Expose()
  @IsInt()
  @IsPositive()
  stock: number;

  @Expose()
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  tags: string[];
}
