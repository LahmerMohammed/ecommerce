import { TokenBlacklist } from '../../database/entities/token-blacklist.entity';
import { ProductEntity } from './../../database/entities/product.entity';
import { ACTION, UpdateUserWhishlistDto } from './dtos/update-user-whishlist.dto';
import { ProductService } from './../product/product.service';
import { forwardRef, Inject, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';

require('dotenv').config('.env/dev.env')


@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {

  constructor(
    @InjectRepository(UserEntity) public readonly userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
    @InjectRepository(TokenBlacklist) private readonly tokenRepo: Repository<TokenBlacklist>,
    private readonly mailService: MailerService,
    private jwtService: JwtService) {
    super(userRepo);
  }
  private async addProductWhishlist(user: UserEntity , product: ProductEntity) : Promise<UserEntity> {
   
   const whishlist = user.whishlist;
   whishlist.push(product);

   return await this.userRepo.save({...user , whishlist});

  }


  private async removeProductWhishlist(user: UserEntity , product: ProductEntity) : Promise<UserEntity> {
    
 
    const whishlist = user.whishlist.filter( _product => _product.id !== product.id)
 
    return await this.userRepo.save({...user , whishlist});
 

 
  }

  async updateUserWhistlist(updateUserWhistlist: UpdateUserWhishlistDto) : Promise<UserEntity>{
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
    
  
  async getUserByEmail(email: string) : Promise<UserEntity> {
    const user = await this.userRepo.findOne({email: email});
    
    return user;
  }

  isTokenExpired(token: string) {
    
    let { exp } = this.jwtService.verify(token , {
      secret: process.env.JWT_SECRET
    });

    exp *= 1000;
    return Date.now() >= exp;
  }

  addTokenToBlacklist(token: TokenBlacklist) {

    const isExpired = this.isTokenExpired(token.token);

    if( !isExpired){
      this.tokenRepo.save(token);
    }
    
  }

  async isTokenBlacklisted(token: string) {

    const tokenBlacklist = await this.tokenRepo.findOne({token: token});

    return !(tokenBlacklist === undefined);
  }

  @Cron(CronExpression.EVERY_5_HOURS)
  async removeExpiredToken() {

    const tokensToRemove: TokenBlacklist[] = [];

    const tokens = await this.tokenRepo.find();

    tokens.map((tokenBlacklist: TokenBlacklist) => {

      const isExpired = this.isTokenExpired(tokenBlacklist.token);
    
      if( isExpired ) {
        tokensToRemove.push(tokenBlacklist);
      } 
    });

    this.tokenRepo.remove(tokensToRemove);
  }
}
