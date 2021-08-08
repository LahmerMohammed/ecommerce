import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { MailService } from './mail.service';
import { IsEmail } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Controller, Post, Body } from '@nestjs/common';
import VerificationTokenPayload from './interfaces/VerifivationTokenPayload.interface';
import { ResendConfirmEmailDto } from './dtos/resend-confirm-email.dto';
import { ApiTags } from '@nestjs/swagger';

require('dotenv').config({path: '.env/dev.env'});

@ApiTags('email')
@Controller()
export class MailController {

  constructor(private readonly mailService: MailService){}

  @Post('confirm-email')
  async emailConfirmation(@Body() confirmEmailDto: ConfirmEmailDto){
    await this.mailService.confirmEmail(confirmEmailDto.token);
  }


  @Post('resend-confirm-email')
  async resendEmailConfirmation(@Body() resendConfirmEmailDto: ResendConfirmEmailDto){
    await this.mailService.resendEmailConfirmation(resendConfirmEmailDto.email);
  }

  
}
