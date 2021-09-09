import { UserEntity } from './../../../database/entities/user.entity';
import { CreateUserDto } from './../../user/dtos/create-user.dto';
import { getUserSample } from './samples/user.sample';
import { UserSerializer } from './../../user/serializers/users.serializer';
import { AuthService } from './../auth.service';
import { AuthController } from "../auth.controller"
import { Test } from '@nestjs/testing';


jest.mock('../auth.service')

describe('AuthController' , () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController]
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService); 
  })

  describe('when register get called' , () => {
    let user: UserEntity;
    let createUserDto: CreateUserDto;
    beforeEach(async () => {
      createUserDto =  { username: 'test',email: 'test@gmail.com',password: '1234test'};
       
      const response = await authController.register(createUserDto);
    
      user = response.user;
    })

    test('the it should call authService' , () => {
      expect(authService.register).toBeCalledWith(createUserDto);
    })
  /*
    test('then it should return' , () => {
      expect(user).toEqual(getUserSample());
    })*/

  })

})