import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends OmitType(CreateProductDto,["added_by_admin_id"]) {
  @Expose()
  @IsUUID()
  updated_by_admin_id: string;
}
