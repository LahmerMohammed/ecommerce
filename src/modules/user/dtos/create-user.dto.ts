import { Roles } from "src/database/entities/role.enum";
import { IsAlpha, IsAlphanumeric, IsBIC, IsISO31661Alpha2, IsDataURI, IsDate, IsEmail, IsEnum, IsLowercase, IsObject, IsPostalCode, IsString, Length, Min, ValidateNested, IsDateString } from 'class-validator';

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

  @IsString()
  @Length(4)
  username: string;

  @IsDateString()
  birthdate: Date;

  @IsString()
  @Length(4)
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(Roles)
  role: Roles;

  @ValidateNested()
  address? : AddressDto;

}

