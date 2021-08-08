import { MailModule } from './../mail/mail.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

require('dotenv').config('.env/dev.env')


@Module({
  imports:[UserModule,PassportModule,MailModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions:{
            expiresIn: process.env.JWT_EXPIRES_IN
          }
        })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
