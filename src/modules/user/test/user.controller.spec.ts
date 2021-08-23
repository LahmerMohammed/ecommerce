import { UserEntity } from './../../../database/entities/user.entity';
import { getUpdateWhistlistStub } from './samples/update-whishlist.stub';
import { UserService } from './../user.service';
import { UserController } from './../user.controller';
import { Test } from '@nestjs/testing';
import { ACTION } from '../dtos/update-user-whishlist.dto';


jest.mock('../user.service');

describe('UserController' , () => {

  let userController: UserController;
  let userService:  UserService;

  beforeEach( async() => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService =  moduleRef.get<UserService>(UserService);
  })

  //TODO : implementing testing for update user whishlist

  describe('when update user whishlist called' , () => {

    let user: UserEntity;

    beforeEach( async () => {
      user = await userController.updateUserWhishList(getUpdateWhistlistStub(ACTION.ADD));
    })

    test.skip('then it should call userService' , () => {
      expect(userController.updateUserWhishList).toBeCalledWith(getUpdateWhistlistStub(ACTION.ADD))
    });

    test.skip('and should return' , () => {
    
    })
  })

})