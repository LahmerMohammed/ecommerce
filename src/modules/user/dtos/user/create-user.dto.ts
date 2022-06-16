import { Role } from "src/database/entities/role.enum";
import { IsEmail, IsEnum,IsString, Length, IsDateString, IsArray, IsPhoneNumber,
         ArrayMinSize, ArrayMaxSize, IsOptional, IsDate } from 'class-validator';
import { Exclude, Expose, Type } from "class-transformer";


// TODO : add values 'role'  field can have

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


  @Expose()
  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(0)
  @IsEnum(Role,{each: true})
  role: Role[];

  /* @Expose()
  @IsOptional()
  @IsDate()
  birthdate: string;

  @Expose()
  @IsOptional()
  @IsPhoneNumber()
  phonenumber: string; */

}

