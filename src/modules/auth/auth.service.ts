import { JwtPayload } from './interfaces/payload.interface';
import { UserSerializer } from './../user/serializers/users.serializer';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './../../database/entities/user.entity';
import { CreateUserDto } from './../user/dtos/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from './../user/user.service';
import { ConflictException, Injectable } from '@nestjs/common';
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
    if( user && ( await bcrypt.compare(password , user.password)) ){
      return user;
    }

    return null;
  }


  async login(user : UserEntity) {
    const payload : JwtPayload = {username: user.username , sub:  user.id};
  
    return {
      access_token: this.jwtService.sign(payload),
      user: plainToClass(UserSerializer,user),
    }
  }

  async register(createUserDto: CreateUserDto) {
       
    const userExist = await this.userService.findOne({
      where: [
        {username: createUserDto.username},
        {email: createUserDto.email}
      ]
    });

    if( userExist )
    {
      throw new ConflictException('user already exist');
    }
  
    createUserDto.password = await bcrypt.hash(createUserDto.password , 10);

    const user = await this.userService.userRepo.save(createUserDto); 
    

    const result = await this.mailService.sendConfirmationEmail(user.email);

    return {
      user: user,
      mailer_response: result,
    };
  }

}
