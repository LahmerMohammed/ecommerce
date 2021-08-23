import { CreateUserDto } from './../../../user/dtos/create-user.dto';
import { UserSerializer } from './../../../user/serializers/users.serializer';

import { UserEntity } from './../../../../database/entities/user.entity';
import { Role } from 'src/database/entities/role.enum';



export const getUserSample = () : UserEntity => {

  const user = new UserEntity();

  user.email = 'test@gmail.com';
  user.username = 'test@gmail.com';
  user.password = 'test@gmail.com';
  user.id = '1'
  return  user;
}