import { Reflector } from '@nestjs/core';
import { ExecutionContext, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/user/user.service';



export class JwtAuthGuard extends AuthGuard('jwt'){
  
  constructor(private reflector: Reflector,
    private readonly userService: UserService){
    super();
  }

  async canActivate(context: ExecutionContext){

    const isValid = await super.canActivate(context);

    const autho : string = context.switchToHttp().getRequest().headers.authorizarion;
    const token = autho.substring(7);

    const isBlacklisted = await this.userService.isTokenBlacklisted(token);

    return isValid && isBlacklisted;
  }

}