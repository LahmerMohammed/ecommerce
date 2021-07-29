import { IsUUID } from "class-validator";


export class AddProductWhishlist {

  @IsUUID()
  product_id: string;

  @IsUUID()
  user_id: string;
}