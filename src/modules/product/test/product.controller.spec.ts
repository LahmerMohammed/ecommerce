import { ProductService } from './../product.service';
import { ProductController } from './../product.controller';
import { Test , TestingModule } from '@nestjs/testing'


import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';
import { UserModule } from 'src/modules/user/user.module';
import { forwardRef } from '@nestjs/common';
import { FirebaseModule } from 'nestjs-firebase';

jest.mock('../product.service')

describe('Product Controller' , () => {

  let productService: ProductService;
  let productController: ProductController;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService]
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productController = module.get<ProductController>(ProductController);
  })

  it('Product Controller - should be defined -' , () => {
    expect(productController).toBeDefined();
  });

  it('Product Service - should be defined -' , () => {
    expect(productService).toBeDefined();
  });

})