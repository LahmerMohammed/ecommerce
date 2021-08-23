import { UpdateUserWhishlistDto, ACTION } from './../../dtos/update-user-whishlist.dto';

export const getUpdateWhistlistStub = (action: ACTION)  : UpdateUserWhishlistDto  => {
  return {
    action: action,
    product_id: '1',
    user_id: '1',
  }
}