import { ReviewEntity } from './../../../database/entities/review.entity';
import { ProductEntity } from './../../../database/entities/product.entity';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from './../../../database/entities/user.entity';
import { Role } from 'src/database/entities/role.enum';
import { AddressEntity } from 'src/database/entities/address.entity';


@Expose()
export class UserSerializer {
  
  id: string;
  username: string;
  email: string;
  whishlist_counter: number;
  address: AddressEntity;

  @Exclude()
  created_at: Date;
  
  @Exclude()
  updated_at: Date;

  @Exclude()
  roles: Role[];

  @Exclude()
  isEmailConfirmed: boolean;

  @Exclude()
  whishlist: ProductEntity[];

  @Exclude()
  password: string;

  @Exclude()
  added_products: ProductEntity[];

  @Exclude()
  reviews: ReviewEntity[];


}