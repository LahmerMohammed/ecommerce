import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {

  constructor(private userService : UserService){}

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
}
