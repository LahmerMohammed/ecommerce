import { getUserSample } from "../test/samples/user.sample";



export const UserService = jest.fn().mockReturnValue({

  createOne: jest.fn().mockReturnValue(getUserSample()),
  getUserById: jest.fn().mockReturnValue(getUserSample()),

})