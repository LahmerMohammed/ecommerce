import { RemoveProductWhishlist } from './dtos/whsihlist-dtos/remove-product-whishlist';
import { AddProductWhishlist } from './dtos/whsihlist-dtos/add-product-whsilst.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Crud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  query: {
    join: {
      address : {
        eager: true,
      }
    }
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  }
})
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {
  }



  @Post('/whishlist/add')
  async addProductWhishlist(@Body() addProductWhishlist: AddProductWhishlist){
    return this.service.addProductWhishlist(addProductWhishlist);
  }

  @Delete('/whishlist/remove')
  async removeProductWhishlist(@Body() removeProductWhishlist: RemoveProductWhishlist) {
    return this.service.removeProductWhishlist(removeProductWhishlist);
  }

}
