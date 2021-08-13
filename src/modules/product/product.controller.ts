import { RolesGuard } from './../../guards/role.guard';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from 'src/database/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/database/entities/role.enum';


@ApiTags('products')
@Crud({
  model: {
    type: ProductEntity,
  },
  dto:{
    create: CreateProductDto,
    update: UpdateProductDto
  },
  routes: {
    updateOneBase: {
      decorators: [],
    },
    deleteOneBase: {
      decorators: []
    }
  }
})
@Controller('products')
export class ProductController implements CrudController<ProductEntity> {
  constructor(public service: ProductService ) {}
}
