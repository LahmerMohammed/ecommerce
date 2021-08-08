import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';



@Injectable()
export class EmailConfirmedGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const isEmailConfirmed = request.user.isEmailConfirmed;
  
    if( !isEmailConfirmed ){
      throw new UnauthorizedException('please confirm your email');
    }

    return isEmailConfirmed; 
  }

}