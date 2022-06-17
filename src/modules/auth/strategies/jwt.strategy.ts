import { UserSerializer } from './../../user/serializers/users.serializer';
import { plainToClass } from 'class-transformer';
import { JwtPayload } from './../interfaces/payload.interface';
import { UserService } from './../../user/user.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { ExtractJwt , Strategy } from 'passport-jwt';



require('dotenv').config('path:.env/dev.env')


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(private readonly userService: UserService){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,  
    })
  }


  async validate(payload: JwtPayload) : Promise<any> {
   
    const user_id = payload.sub;
    
    const user = this.userService.findOne({where: {id: user_id}});

    return plainToClass(UserSerializer,user);

  }
}