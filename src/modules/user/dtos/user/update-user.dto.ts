import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from "src/database/entities/role.enum";
import { IsAlpha, IsAlphanumeric, IsBIC, IsISO31661Alpha2, IsDataURI, IsDate, IsEmail, IsEnum, IsLowercase, IsObject, IsPostalCode, IsString, Length, Min, ValidateNested, IsDateString, IsArray, IsOptional, IsPhoneNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

//export class UpdateUserDto extends PartialType(OmitType(CreateUserDto,["password","email"])) {}

@Exclude()
export class UpdateUserDto{

  @Expose()
  @IsString()
  @IsOptional()
  @Length(4)
  username: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsDateString()
  birthdate: string;

  @Expose()
  @IsOptional()
  @IsPhoneNumber()
  phonenumber: string;

}
