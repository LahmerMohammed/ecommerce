import { Injectable, CanActivate, ExecutionContext, NotImplementedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/database/entities/role.enum';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly productService:  ProductService) {}

  canActivate(context: ExecutionContext): boolean {
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some(role => user.roles.includes(role) );

  }
}
