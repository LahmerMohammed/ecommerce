import { Role } from "src/database/entities/role.enum";
import { IsAlpha, IsAlphanumeric, IsBIC, IsISO31661Alpha2, IsDataURI, IsDate, IsEmail, IsEnum, IsLowercase, IsObject, IsPostalCode, IsString, Length, Min, ValidateNested, IsDateString, IsArray, isPhoneNumber, IsPhoneNumber } from 'class-validator';
import { Exclude, Expose } from "class-transformer";


@Exclude()
export class CreateUserDto {

  @Expose()
  @IsString()
  @Length(4)
  username: string;

  @Expose()
  @IsString()
  @Length(4)
  password: string;

  @Expose()
  @IsEmail()
  email: string;

}

