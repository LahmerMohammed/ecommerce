import { TokenBlacklist } from '../../database/entities/token-blacklist.entity';
import { plainToClass } from 'class-transformer';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { UserSerializer } from './serializers/users.serializer';
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ValidationPipe, UseGuards, NotImplementedException, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user/create-user.dto';
import { UpdateUserDto } from './dtos/user/update-user.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from "@nestjsx/crud";
import { ApiBearerAuth, ApiHeader, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/database/entities/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { UpdateUserWhishlistDto } from './dtos/update-user-whishlist.dto';

@ApiTags('user')
@Crud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
    replace: UpdateUserDto,
  },
  serialize: {
    get: UserSerializer,
    getMany: UserSerializer,
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
  },
  routes: {
    exclude:["updateOneBase"],
  },
  
})
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard/**,RolesGuard */)
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {
  }
 

  @Put('/:id')
  async updateUser(@Param("id") user_id: string , @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    throw new NotImplementedException();
  }


  @Patch('/whishlist/update')
  async updateUserWhishList(@Body() updateUserWhishList: UpdateUserWhishlistDto) : Promise<UserEntity>
  {
    return await this.service.updateUserWhistlist(updateUserWhishList);
  }


  @Get('/email/:email')
  async getUserByEmail(@Param() params) : Promise<UserSerializer> {
    const user = await this.service.getUserByEmail(params.email);
  
    return plainToClass(UserSerializer , user);
  }


  @Post('/blacklist')
  addTokenToBlacklist(@Body() token : TokenBlacklist) {

    this.service.addTokenToBlacklist(token);
  }
}
