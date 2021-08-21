import { CreateUserDto } from './../../../user/dtos/create-user.dto';
import { UserSerializer } from './../../../user/serializers/users.serializer';

import { UserEntity } from './../../../../database/entities/user.entity';
import { Role } from 'src/database/entities/role.enum';



export const getUserSample = () : CreateUserDto => {
  return  {
    username: 'test',
    email: 'test@gmail.com',
    password: '1234test',
    address: null,
    id: null,
    updated_at: null,
    isEmailConfirmed: null,
    roles: null,
    created_at: null,

  }
}