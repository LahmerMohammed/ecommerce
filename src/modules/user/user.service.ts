import { ProductService } from './../product/product.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AddProductWhishlist } from './dtos/add-product-whsilst.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveProductWhishlist } from './dtos/remove-product-whishlist';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly productService: ProductService,
    ) {
    super(userRepo);
  }
  async addProductWhishlist(addToWhishlist: AddProductWhishlist) : Promise<UserEntity> {
   
    const user = await this.userRepo.findOne({
     id: addToWhishlist.user_id
   });

   if( !user) {
     throw new NotFoundException('Invalid user');
   }


   const product = await this.productService.findOne({
     id: addToWhishlist.product_id
   })

   if( !product){
    throw new NotFoundException('Invalid product');
   }

   user.whishlist.push(product);

   await this.userRepo.update(user.id , user);

   return user;

  }


  async removeProductWhishlist(removeToWhishlist: RemoveProductWhishlist) : Promise<UserEntity> {
    
    const user = await this.userRepo.findOne({
      id: removeToWhishlist.user_id
    });
 
    if( !user) {
      throw new NotFoundException('Invalid user');
    }
 
 
    const product = await this.productService.findOne({
      id: removeToWhishlist.product_id
    })
 
    if( !product){
     throw new NotFoundException('Invalid product');
    }
 
    user.whishlist = user.whishlist.filter( _product => _product.id !== product.id)
 
    await this.userRepo.update(user.id,user);
 
    return user;
 
   }
    
  
}
