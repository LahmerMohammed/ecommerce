import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService : AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Request() req){
    return req.user;
  }

}
