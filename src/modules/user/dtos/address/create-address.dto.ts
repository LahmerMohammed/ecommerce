import { Exclude, Expose } from "class-transformer";
import { IsString, IsISO31661Alpha2, IsPostalCode, Length, IsNotEmpty, IsUUID, IsOptional } from "class-validator";



@Exclude()
export class CreateAddressDto {


  @Expose()
  @IsString()
  phonenumber: string;

  @Expose()
  @IsString()
  @Length(4)
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  address_line: string;

  @IsOptional()
  user: { id: string };
}