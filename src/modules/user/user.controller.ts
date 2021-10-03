import { UpdateAddressDto } from './dtos/address/update-address.dto';
import { CreateAddressDto } from './dtos/address/create-address.dto';
import { TokenBlacklist } from '../../database/entities/token-blacklist.entity';
import { plainToClass } from 'class-transformer';
import { ClassSerializerInterceptor, Req } from '@nestjs/common';
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
import { throws } from 'assert';

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
 

  @Put('/')
  async updateUser(@Req() req , @Body() updateUserDto: UpdateUserDto) {
    
    const { id } = req.user;
    return await this.service.updateUser(id , updateUserDto);
  }


  @Put('/whishlist/update')
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

  @Post('/address')
  async addUserAddress(@Req() request , @Body() createAddressDto: CreateAddressDto)  {
    const { id } = request.user;
    return await this.service.addUserAddress(id , createAddressDto);
  }

  @Get('/address')
  async getAddresses(@Req() request)  {
    const { id } = request.user;
    return await this.service.getAddresses(id);
  }

  @Put('/address')
  async updateUserAddress(@Req() request , @Body() updateAddressDto: UpdateAddressDto)  {
    const { id } = request.user;
    return await this.service.updateUserAddress(id , updateAddressDto);
  }

  @Delete('/address/:id')
  async deleteUserAddress(@Req() request , @Param('id') address_id: string){
    const { id } = request.user;
    
    await this.service.deleteAddress(id , address_id);
  }
}
