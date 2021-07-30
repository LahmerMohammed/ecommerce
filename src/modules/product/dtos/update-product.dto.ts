import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  
  @Exclude()
  added_by_admin_id: string;
}
