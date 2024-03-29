import { UpdateProductDto } from './dtos/update-product.dto';
import { DeleteImageDto } from './dtos/delete-image.dto';
import { NotImplementedException, NotFoundException } from '@nestjs/common';
/* import { FirebaseService } from './../firebase/firebase.service';
 */import { UserService } from './../user/user.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductEntity } from 'src/database/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, GetManyDefaultResponse, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';
import { DeepPartial, Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service';
import { DeleteProductDto } from './dtos/delete-product.dto';
import { UserProductSerializer } from './serializers/user-product.serializer';

@Injectable()
export class ProductService extends TypeOrmCrudService<ProductEntity> {  
  constructor(@InjectRepository(ProductEntity) private readonly productRepo : Repository<ProductEntity>,
              @Inject(forwardRef(() => UserService )) private readonly userService: UserService,
              private readonly firebaseService: FirebaseService, 
              ){
    super(productRepo);
  }


  @Override('createOneBase')
  async createOneBase(user_id: string , createProductDto: CreateProductDto,
                      images: Array<Express.Multer.File>) {
    
    var product = plainToClass(ProductEntity,createProductDto);
  
    const user = await this.userService.findOne({where: {id: user_id}});

    if( !user ){
      throw new UnauthorizedException('User not found');
    }
    product.created_by = user;
    
    const saved_product = await this.productRepo.save(product); 

    const  uploadFilesDto  = {basePath: `${user.id}/${product.id}` , images}

    const response = {
      product: saved_product,
      filesUploading: await this.firebaseService.uploadFiles(uploadFilesDto)
    }
    return response;
  }


  @Override('createManyBase')
  async createManyBase(createProductsDto: CreateProductDto[]) {}

  

  async isOwner(product_id: string , user_id: string) : Promise<boolean> {
    
    const product = await this.productRepo.findOne({where: {id: product_id}});
  
    return product.created_by_id == user_id;
  }

  async addImages(user_id: string , addImageDto: {product_id: string , images: Array<Express.Multer.File>}){
    
    const basePath = `${user_id}/${addImageDto.product_id}`;

    const uploadFilesDto = {basePath , images: addImageDto.images}
    try{
      return await this.firebaseService.uploadFiles(uploadFilesDto);
    }catch(error){
      console.log(error);
    }
  }


  async deleteImage(user_id: string , deleteImageDto: DeleteImageDto)
  {
    const imagePath = `${user_id}/${deleteImageDto.product_id}/${deleteImageDto.image_id}`;

    return this.firebaseService.deleteFile(imagePath);
  }

  @Override('updateOneBase')
  async updateOneBase(updateProductDto: UpdateProductDto){
    
    const product_counter = await this.repo.count({where: {id: updateProductDto.product_id}}); 

    if( product_counter != 1){
      throw new NotFoundException(`Product with id = ${updateProductDto.product_id} not found`);
    }
    
    return await this.repo.save({...updateProductDto});
    
  }

  @Override('updateOneBase')
  async deleteOneBase(product_id: string) {
    return await this.repo.delete({id: product_id});
  }
  
  @Override('getManyBase')
  async findAll(req: CrudRequest){

    const result =  await this.getMany(req);
    
    let data : ProductEntity[];
    let rest: any = {};

    if( 'data' in result)
    {
      data = result.data;

      Object.keys(result).forEach((key) => {
        if( key !== "data") 
          rest[key] = result[key];
      });
      
    }else{
      data =  result;
    }
    
    const products = await Promise.all(data.map( async(product) => {
      
      const image = await this.firebaseService.downloadFile(product.created_by_id,product.id);
      const product_serializer = new UserProductSerializer({...product});
      
      const result = {image ,...product_serializer}
      
      return result;
    }));

    const response = { data: products, ...rest};

    return response;
  }

  
}
