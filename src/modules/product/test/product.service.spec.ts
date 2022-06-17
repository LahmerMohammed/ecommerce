import { ProductController } from './../product.controller';
import { ProductEntity } from './../../../database/entities/product.entity';
import {  Repository } from 'typeorm';
import { ProductService } from './../product.service';
import { Test,TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';



describe('Product Service' , () => {
  
  let service: ProductService;
  let repo: Repository<ProductEntity>;
  
  
  beforeEach(async() => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();

  })
})