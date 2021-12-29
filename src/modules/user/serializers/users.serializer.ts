import { ReviewEntity } from './../../../database/entities/review.entity';
import { ProductEntity } from './../../../database/entities/product.entity';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from './../../../database/entities/user.entity';
import { Role } from 'src/database/entities/role.enum';
import { AddressEntity } from 'src/database/entities/address.entity';


@Exclude()
export class UserSerializer {
  
  @Expose()
  id: string;

  @Expose()
  username: string;
  
  @Expose()
  email: string;
  
  @Expose()
  whishlist_counter: number;
  
  @Expose()
  address: AddressEntity;
  
  @Expose()
  roles: Role[];


}