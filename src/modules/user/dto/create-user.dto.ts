import { Roles } from "src/database/entities/user.entity";
import { IsAlpha, IsAlphanumeric, IsBIC, IsISO31661Alpha2, IsDataURI, IsDate, IsEmail, IsEnum, IsLowercase, IsObject, IsPostalCode, IsString, Length, Min, ValidateNested } from 'class-validator';

//make custom validator for address

class AddressDto {

  @IsString()
  street: string;

  @IsISO31661Alpha2()
  country: string;
  
  @IsString()
  city: string;
  
  @IsString()
  town: string;

  @IsPostalCode()
  zipcode: string;
}

export class CreateUserDto {

  @IsAlpha()
  firstname: string;

  @IsAlpha()
  lastname: string;

  @IsAlphanumeric()
  @Min(4)
  username: string;

  @IsDate()
  birthdate: Date;

  @IsString()
  @Min(4)
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(Roles)
  role: Roles;

  @ValidateNested()
  address? : AddressDto;

}

