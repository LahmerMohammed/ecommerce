import { getUserSample } from "../test/samples/user.sample";



export const AuthService = jest.fn().mockReturnValue({
  register: jest.fn().mockReturnValue(getUserSample()),
})