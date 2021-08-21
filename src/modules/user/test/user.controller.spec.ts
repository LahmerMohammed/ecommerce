import { UserService } from './../user.service';
import { UserController } from './../user.controller';
import { Test } from '@nestjs/testing';



describe('UserController', async () => {
  let userController : UserController;
  let userService : UserService;


  beforeEach(async () => {
    const moduleRef = await  Test.createTestingModule({
      imports: [],
      providers: [UserService],
      controllers: [UserController],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
    
  })

  describe('getUsers' , () => {describe('when getUsers get called', () => {}) })

})