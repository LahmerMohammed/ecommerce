import { DeleteImageDto } from './dtos/delete-image.dto';
import { NotImplementedException } from '@nestjs/common';
/* import { FirebaseService } from './../firebase/firebase.service';
 */import { UserService } from './../user/user.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductEntity } from 'src/database/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ProductService extends TypeOrmCrudService<ProductEntity> {
  constructor(@InjectRepository(ProductEntity) private readonly productRepo : Repository<ProductEntity>,
              @Inject(forwardRef(() => UserService )) private readonly userService: UserService,
              private readonly firebaseService: FirebaseService, 
              ){
    super(productRepo);
  }


  @Override('createOneBase')
  async createOneBase(createProductDto: CreateProductDto,
                      images: Array<Express.Multer.File>) {
    
    var product = plainToClass(ProductEntity,createProductDto);
  
    const user = await this.userService.findOne({id: createProductDto.added_by_user_id});

    if( !user ){
      throw new UnauthorizedException('user not found');
    }
    product.added_by = user;
    
    const saved_product = await this.productRepo.save(product); 

    const  uploadFilesDto  = {basePath: `${user.id}/${product.id}` , images}

    const response = {
      product: saved_product,
      filesUploading: await this.firebaseService.uploadFiles(uploadFilesDto)
    }
    return response;
  }


  @Override('createManyBase')
  async createManyBase(createProductsDto: CreateProductDto[]) {

    var products = plainToClass(ProductEntity,createProductsDto);


    const user = await this.userService.findOne({id: createProductsDto[0]!.added_by_user_id});

    if( !user ){
      throw new UnauthorizedException('user not found');
    }

    products.forEach(product => {
      product.added_by = user;
    });

    return await this.productRepo.save(products);

  }

  

  async isOwner(product_id: string , user_id: string) : Promise<boolean> {
    
    const product = await this.productRepo.findOne({id: product_id});
  
    return product.added_by_id == user_id;
  }

  async addImages(user_id: string , addImageDto: {product_id: string , images: Array<Express.Multer.File>}){
    
    const basePath = `${user_id}/${addImageDto.product_id}`;

    const uploadFilesDto = {basePath , images: addImageDto.images}

    return this.firebaseService.uploadFiles(uploadFilesDto);
  }


  async deleteImage(user_id: string , deleteImageDto: DeleteImageDto)
  {
    const imagePath = `${user_id}/${deleteImageDto.product_id}/${deleteImageDto.image_id}`;

    return this.firebaseService.deleteFile(imagePath);
  }
}
