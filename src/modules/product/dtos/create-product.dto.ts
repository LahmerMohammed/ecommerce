import { Expose } from "class-transformer";
import { IsInt, isNotEmptyObject, IsPositive, IsString, IsUUID } from "class-validator";
import { IsNull } from "typeorm";



export class CreateProductDto {
  
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsInt()
  @IsPositive()
  price: number;

  @Expose()
  @IsInt()
  @IsPositive()
  quantity: number;

  @Expose()
  @IsUUID()
  added_by_admin_id: string;
}
