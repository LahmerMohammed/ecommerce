import { Crud, CrudController } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from 'src/database/entities/product.entity';
@Crud({
  model: {
    type: ProductEntity,
  },
})
@Controller('products')
export class ProductController implements CrudController<ProductEntity> {
  constructor(public service: ProductService) {}
}
