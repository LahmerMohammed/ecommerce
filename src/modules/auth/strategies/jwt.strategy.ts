import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { ExtractJwt , Strategy } from 'passport-jwt';





@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'secret',  
    })
  }


  async validate(payload: any) : Promise<any> {
    return  {user_id: payload.sub , username: payload.username }
    
  }
}