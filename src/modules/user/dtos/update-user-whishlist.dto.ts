import { IsEnum, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export enum ACTION { ADD="add" , DELETE="delete"};


@Expose()
export class UpdateUserWhishlistDto{


  @IsEnum(ACTION)
  action: ACTION;
  
  @IsUUID()
  product_id: string;

  @IsUUID()
  user_id: string;

}