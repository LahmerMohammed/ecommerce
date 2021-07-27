import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  

  constructor(private userService : UserService,
              private jwtService: JwtService){}

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
}
