import { UpdateUserDto } from './dtos/update-user.dto';
import { CrudRequest } from '@nestjsx/crud';
import { ProductService } from './../product/product.service';
import { forwardRef, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AddProductWhishlist } from './dtos/whsihlist-dtos/add-product-whsilst.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveProductWhishlist } from './dtos/whsihlist-dtos/remove-product-whishlist';
import { Override } from '@nestjsx/crud';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
    
    private readonly mailService: MailerService) {
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


   async setEmailConfirmed(email: string) {
     const user = await this.userRepo.update({email: email} , {isEmailConfirmed: true});
   }
    
  
  
}
