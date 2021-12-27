import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

  @IsUUID()
  product_id: string;
}
