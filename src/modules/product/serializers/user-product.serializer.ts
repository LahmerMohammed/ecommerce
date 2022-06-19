import { ProductEntity } from 'src/database/entities/product.entity';
import { StreamableFile } from '@nestjs/common';
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserProductSerializer {

  @Expose()
  id: string;

  @Expose()
  image: StreamableFile;

  @Expose()
  name: string;

  @Expose()
  rating: string;

  @Expose()
  regular_price: number;

  @Expose()
  sale_price: number;
  
  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }


}