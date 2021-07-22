import { CrudController } from '@nestjsx/crud';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from 'src/database/entities/product.entity';

@Controller('product')
export class ProductController implements CrudController<ProductEntity> {
  constructor(public service: ProductService) {}
}
