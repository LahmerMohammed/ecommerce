import { getProductWhishlistSample } from './../test/samples/user.sample';


export const UserService = jest.fn().mockReturnValue({
  addProductWhishlist: jest.fn().mockResolvedValue(getProductWhishlistSample()),

})