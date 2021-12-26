import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';


@Exclude()
export class DeleteImageDto {  
  
  @Expose()
  product_id: string;
  
  @Expose()
  image_id: string;
}