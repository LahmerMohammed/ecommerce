import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './../user/user.module';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';

require('dotenv').config({path: '.env/dev.env'})


@Module({
  imports: [UserModule,JwtModule.register({
    secret: process.env.EMAIL_CONF_JWT_SECRET,
    signOptions:{
      expiresIn: process.env.EMAIL_CONF_JWT_EXPIRES_IN,
    }
  }),
  MailerModule.forRoot({
    transport: {
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      },
    }}),
  ],
  
  providers: [MailService],
  controllers:[MailController],
  exports: [MailService]
})
export class MailModule {}
