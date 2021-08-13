import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/database/entities/role.enum";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { ProductService } from "src/modules/product/product.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly productService:  ProductService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    

    const { user } = context.switchToHttp().getRequest();
    const { body } = context.switchToHttp().getRequest();
    
    const isOwner = await this.productService.isOwner(body.user_id,body.product_id);

    return requiredRoles.some(role => user.roles.includes(role)) || isOwner; 

  }
}
