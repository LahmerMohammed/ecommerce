import { UserEntity } from './../../database/entities/user.entity';
import { CreateUserDto } from './../user/dtos/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly mailService: MailService,
              private readonly userService: UserService){}

  async validateUser(username: string , password: string) : Promise<any> {
    const user = await this.userService.findOne({
    username: username
    });
  
    // TODO : exclude some fields
    if( user && bcrypt.compare(password , user.password)){
      return user;
    }

    return null;
  }


  async login(user : any) {
    const payload = {username: user.username , sub:  user.id};
  
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.userRepo.save(createUserDto); 

    const result = await this.mailService.sendConfirmationEmail(user.email);

    return user;
  }

}
