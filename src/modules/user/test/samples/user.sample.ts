import { UserSerializer } from './../../serializers/users.serializer';
import { UserEntity } from './../../../../database/entities/user.entity';
import { Role } from 'src/database/entities/role.enum';



export const getUserSample = () : UserSerializer => {
  
  return {
    id: '1',
    username: 'test',
    email: 'test@gmail.com',
    whishlist_counter: 0,
    address: null,
    roles: [Role.USER],
  }

}