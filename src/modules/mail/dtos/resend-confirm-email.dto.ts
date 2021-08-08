import { IsEmail } from "class-validator";


export class ResendConfirmEmailDto {

  @IsEmail()
  email: string;

}