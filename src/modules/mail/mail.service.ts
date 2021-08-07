import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import VerificationTokenPayload from './interfaces/VerifivationTokenPayload.interface';


require('dotenv').config({path: '.env/dev.env'});




@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService,
              private readonly jwtService: JwtService){}


  async sendConfirmationEmail(email: string) {
    const payload : VerificationTokenPayload = {email};

    const token = this.jwtService.sign(payload,{
      secret: process.env.EMAIL_CONF_JWT_SECRET,
      expiresIn: process.env.EMAIL_CONF_JWT_EXPIRES_IN
    });

    const url = `${process.env.EMAIL_CONF_URL}?${token}`;

    const text = `Welcome to my application. To confirm your email address click here ${url}`;

  
    const result = await this.mailerService.sendMail({
      to: email,
      subject: 'EMAIL CONFIRMATION',
      text: text
    });
  }


  async decodeConfirmationToken(token: string)  {
    try {
      const payload = await this.jwtService.verify(token,{
        secret: process.env.EMAIL_CONF_JWT_SECRET,
      });


      if(typeof payload === 'object' && 'email' in payload){
        return payload.email;
      }

      throw new BadRequestException();

    } catch (error) {

      if( error?.name === 'TokenExpiredError'){
        throw new BadRequestException('Email confirmation url exipred')
      }

      throw new BadRequestException('Bad confirmation token');
    }
  }
}