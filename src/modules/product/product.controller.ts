import { UserEntity } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { RolesGuard } from './../../guards/role.guard';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Controller, Post, UseGuards, Body, UseInterceptors, UploadedFiles, UploadedFile, Req, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from 'src/database/entities/product.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/database/entities/role.enum';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { request } from 'http';
import { DeleteImageDto } from './dtos/delete-image.dto';
import { User } from 'src/decorators/user.decorator';


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
        createProductDto:{
          type: 'object',
        }
      },
    },
  }) 
  @UseInterceptors(FilesInterceptor('images'))
  /**
   * TODO : set 'createProductDto' to 'CreateProductDto' or add data validation manually 
   */
  async addProduct(@UploadedFiles() images: Array<Express.Multer.File>,
                   @Body("product_dto") createProductDto: any)
  {
    images.forEach(file => {
      console.log(file.originalname) 
    });
    console.log(createProductDto);
    
    return this.service.createOneBase(createProductDto , images);
  }

 

  
  @Delete('/images')
  async deleteImage(@Body() crudImageDto: DeleteImageDto , @User("id") user_id: string )
  {
    return this.service.deleteImage(user_id , crudImageDto);
  }
}

