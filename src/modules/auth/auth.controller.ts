import { TokenBlacklist } from 'src/database/entities/token-blacklist.entity';
import { EmailConfirmedGuard } from './../../guards/email-confirmed.guard';
import { CreateUserDto } from './../user/dtos/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService : AuthService,) {}

  @UseGuards(LocalAuthGuard,EmailConfirmedGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }


  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto){
    return await this.authService.register(createUserDto);
  }

  @Post('/logout')
  logout(@Body() tokenBlacklist: TokenBlacklist) {
    this.authService.logout(tokenBlacklist);
  }
}
