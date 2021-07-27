import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { Crud, CrudController } from "@nestjsx/crud";


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
        exclude: ["id"]
      }
    }
  }
})
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {
  }
}
