import { ProductGuard } from './../../guards/product-owner.guard';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { RolesGuard } from './../../guards/role.guard';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Crud, CrudController, Override, CrudRequest } from '@nestjsx/crud';
import { Controller, Post, UseGuards, Body, UseInterceptors, UploadedFiles, UploadedFile, Req, Delete, Put, BadRequestException, Param, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from 'src/database/entities/product.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/database/entities/role.enum';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { request } from 'http';
import { DeleteImageDto } from './dtos/delete-image.dto';
import { User } from 'src/decorators/user.decorator';
import { isUUID, IsUUID, validate, validateOrReject, ValidationError, Length } from 'class-validator';
import { BodyValidation } from 'src/decorators/body-validation.decorator';
import { DeleteProductDto } from './dtos/delete-product.dto';


@ApiTags('products')
//@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: ProductEntity,
    
  },
  dto:{
    create: CreateProductDto,
    update: UpdateProductDto,
  },
  routes: {
    updateOneBase: {
      decorators: [UseGuards(ProductGuard)]
    },
    deleteOneBase: {
      decorators: [UseGuards(ProductGuard)]
    }
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  },
})
@Controller('products')
export class ProductController implements CrudController<ProductEntity> {
  constructor(public service: ProductService ) {}

  @Override("createOneBase")
  @Post('/')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        createProductDto:{
          type: 'object',
          
        }
      },
    },
  }) 
  @UseInterceptors(FilesInterceptor('images'))
  async addProduct(@UploadedFiles() images: Array<Express.Multer.File>,
                   @BodyValidation(CreateProductDto) createProductDto: CreateProductDto,
                   @User("id") user_id: string)
  {

    images.forEach(file => {
      console.log(file.originalname) 
    });
    console.log(createProductDto); 
    
    return this.service.createOneBase(user_id, createProductDto , images);
  }

 

  
  @Delete('/images')
  async deleteImage(@Body() deleteImageDto: DeleteImageDto , @User("id") user_id: string )
  {
    return await this.service.deleteImage(user_id , deleteImageDto);
  }

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        product_id:{
          type: 'uuid',
        }
      },
    },
  }) 
  @UseInterceptors(FilesInterceptor('images'))
  @Put('/images')
  async addImage(@UploadedFiles() images: Array<Express.Multer.File>,
                 @User("id")  user_id: string,
                 @Body("product_id") product_id: string)
  {
   if( !isUUID(product_id) ){
     throw new BadRequestException('product_id must be valid uuid');
   }

   const body = { product_id , images};
   return await this.service.addImages(user_id , body ); 
  }

  @Get('/details')
  async getProductDetails(@Body() req: CrudRequest)
  {
    return await this.service.getMany(req);
  }


}

