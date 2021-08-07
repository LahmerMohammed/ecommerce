import { MailerService } from '@nestjs-modules/mailer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService : AuthService,
    private readonly mailService:MailerService) {}

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

  @Get('/sendmail')
  async sendmail(){
    this
    .mailService
    .sendMail({
      to: ['lahmermohammed65@gmail.com'], // list of receivers
      from: 'moha.topper@gmail.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  } 

}
