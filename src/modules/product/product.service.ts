import { UserService } from './../user/user.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductEntity } from 'src/database/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService extends TypeOrmCrudService<ProductEntity> {
  constructor(@InjectRepository(ProductEntity) private readonly productRepo,
  @Inject(forwardRef(() => UserService )) private readonly userService: UserService){
    super(productRepo);
  }


  @Override('createOneBase')
  async createOneBase(createProductDto: CreateProductDto) {
    var product = plainToClass(ProductEntity,createProductDto);


    const admin = await this.userService.findOne({id: createProductDto.added_by_admin_id});

    if( !admin ){
      throw new UnauthorizedException('invalid admin');
    }

    product.added_by_admin = admin;
    product.updated_by_admin = admin;

    await this.productRepo.save(product);

  }


  @Override('createManyBase')
  async createManyBase(createProductsDto: CreateProductDto[]) {

    var products = plainToClass(ProductEntity,createProductsDto);


    const admin = await this.userService.findOne({id: createProductsDto[0]!.added_by_admin_id});

    if( !admin ){
      throw new UnauthorizedException('invalid admin');
    }

    products.forEach(product => {
      product.added_by_admin = admin;
      product.updated_by_admin = admin;

    });

    await this.productRepo.save(products);

  }
}
