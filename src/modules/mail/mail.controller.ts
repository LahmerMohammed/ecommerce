import { IsEmail } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Controller, Post } from '@nestjs/common';
import VerificationTokenPayload from './interfaces/VerifivationTokenPayload.interface';

require('dotenv').config({path: '.env/dev.env'});

@Controller()
export class MailController {

  constructor(private readonly jwtService: JwtService){}

  @Post('confirm-email')
  async emailConfirmation(token: string){
    
  }
  
}
