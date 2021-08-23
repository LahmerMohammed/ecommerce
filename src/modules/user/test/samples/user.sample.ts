import { ProductEntity } from './../../../../database/entities/product.entity';
import { UserEntity } from './../../../../database/entities/user.entity';
import { UpdateUserWhishlistDto, ACTION } from './../../dtos/update-user-whishlist.dto';


/**
 * 
 * @args for 'userService.updateUserWhishlist' function
 */
export const getProductWhishlistSample = (action: ACTION) : UpdateUserWhishlistDto => {
    return {
      product_id: '1',
      user_id: '1',
      action: action,
    }
}

export const getProductStub = () : ProductEntity => {
  const product = new ProductEntity();

  product.id = '1';

  return product;
}

// return of 'userService.updateUserWhishlist' function
export const getUserWhishlistStub = () : UserEntity => {
  const user = new UserEntity();
  const product = new ProductEntity();
  
  product.id='1';
  user.id = '1';
  user.whishlist = [product];

  return user;

}

