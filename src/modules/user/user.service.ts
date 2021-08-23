import { ProductEntity } from './../../database/entities/product.entity';
import { ACTION, UpdateUserWhishlistDto } from './dtos/update-user-whishlist.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CrudRequest } from '@nestjsx/crud';
import { ProductService } from './../product/product.service';
import { forwardRef, Inject, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Override } from '@nestjsx/crud';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {

  constructor(
    @InjectRepository(UserEntity) public readonly userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
    
    private readonly mailService: MailerService) {
    super(userRepo);
  }
  private async addProductWhishlist(user: UserEntity , product: ProductEntity) : Promise<UserEntity> {
   
   user.whishlist.push(product);

   await this.userRepo.update(user.id , user);

   return user;

  }


  private async removeProductWhishlist(user: UserEntity , product: ProductEntity) : Promise<UserEntity> {
    
 
    user.whishlist = user.whishlist.filter( _product => _product.id !== product.id)
 
    await this.userRepo.update(user.id,user);
 
    return user;
 
  }

  async updateUserWhistlist(updateUserWhistlist: UpdateUserWhishlistDto){
    const user = await this.userRepo.findOne({
      id: updateUserWhistlist.user_id
    });
    if( !user) {
      throw new NotFoundException('Invalid user');
    }
    const product = await this.productService.findOne({
      id: updateUserWhistlist.product_id
    })
    if( !product){
     throw new NotFoundException('Invalid product');
    }

    switch(updateUserWhistlist.action){
      case ACTION.ADD: 
      {
        return await this.addProductWhishlist(user,product);
      }
      case ACTION.DELETE:
      {
        return await this.removeProductWhishlist(user,product);
      }   
      default: throw new BadRequestException('ACTION is not defined');
    }
    
  }

  async setEmailConfirmed(email: string) {
    await this.userRepo.update({email: email} , {isEmailConfirmed: true});
  }
    
  
  
}
