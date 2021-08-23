import { ACTION } from '../dtos/update-user-whishlist.dto';
import { getUserWhishlistStub } from '../test/samples/user.sample';


export const UserService = jest.fn().mockReturnValue({
  updateUserWhistlist: jest.fn().mockResolvedValue(getUserWhishlistStub()),
})