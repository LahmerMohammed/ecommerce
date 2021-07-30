import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from "src/database/entities/role.enum";
import { IsAlpha, IsAlphanumeric, IsBIC, IsISO31661Alpha2, IsDataURI, IsDate, IsEmail, IsEnum, IsLowercase, IsObject, IsPostalCode, IsString, Length, Min, ValidateNested, IsDateString, IsArray, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

//export class UpdateUserDto extends PartialType(OmitType(CreateUserDto,["password","email"])) {}


export class UpdateUserDto extends PartialType(CreateUserDto){

  @Exclude()
  email: string;

  @Exclude()
  phone_number: string;

  @Exclude()
  password:string;
}
