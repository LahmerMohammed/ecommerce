import { Exclude, Expose } from "class-transformer";
import { IsUUID } from "class-validator";



@Exclude()
export class DeleteProductDto{
  
  @Expose()
  @IsUUID()
  product_id: string

}