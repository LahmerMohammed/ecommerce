import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { RolesGuard } from './../../guards/role.guard';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Controller, Post, UseGuards, Body, UseInterceptors, UploadedFiles, UploadedFile, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from 'src/database/entities/product.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/database/entities/role.enum';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { request } from 'http';


@ApiTags('products')
//@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: ProductEntity,
  },
  dto:{
    create: CreateProductDto,
    update: UpdateProductDto
  },
  routes: {
    updateOneBase: {
      decorators: []
    },
    deleteOneBase: {
      decorators: []
    }
  }
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
        product_dto:{
          type: 'object',
        }
      },
    },
  }) 
  @UseInterceptors(FilesInterceptor('images'))
  async addProduct(@UploadedFiles() images: Array<Express.Multer.File>,
                   @Body("product_dto") product_dto: CreateProductDto)
  {
    //return this.service.createOneBase(createProductDto , images);
    images.forEach(file => {
      console.log(file.originalname) 
    });
  
    console.log(product_dto);
  }
}

