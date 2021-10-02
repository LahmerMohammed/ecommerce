import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';



@Exclude()
export class UpdateAddressDto extends PartialType(CreateAddressDto) {


  @Expose()
  @IsUUID()
  id: string;

  @Exclude()
  user_id: string;
}