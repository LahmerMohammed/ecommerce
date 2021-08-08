import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import VerificationTokenPayload from './interfaces/VerifivationTokenPayload.interface';


require('dotenv').config({path: '.env/dev.env'});




@Injectable()
export class MailService {
  
  

  constructor(private readonly mailerService: MailerService,
              private readonly jwtService: JwtService,
              private readonly userService: UserService){}


  async sendConfirmationEmail(email: string) {
    const payload : VerificationTokenPayload = {email};

    const token = this.jwtService.sign(payload);

    const url = `${process.env.EMAIL_CONF_URL}?${token}`;

    const text = `Welcome to my application. To confirm your email address click here ${url}`;

  
    const result = await this.mailerService.sendMail({
      to: email,
      subject: 'EMAIL CONFIRMATION',
      text: text
    });

    return result;
  }

  async confirmEmail(token: string) {
    
    const email = await this.decodeConfirmationToken(token);

    const user = await this.userService.findOne({email: email});
    
    if( user.isEmailConfirmed){
      throw new BadRequestException('Email already confirmed');
    }

    await this.userService.setEmailConfirmed(email);
  }


  async decodeConfirmationToken(token: string)  {

    try {
      const payload = await this.jwtService.verifyAsync(token);


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

  async resendEmailConfirmation(email: string) {
    const user = await this.userService.findOne({email: email});
    
    if( user.isEmailConfirmed ){
      throw new BadRequestException('email already confirmed');
    }

    return await this.sendConfirmationEmail(email);

  }
}