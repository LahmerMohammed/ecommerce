import { UserEntity } from '../../../database/entities/user.entity';
import { CreateUserDto } from '../../user/dtos/user/create-user.dto';
import { getUserSample } from './samples/user.sample';
import { UserSerializer } from '../../user/serializers/users.serializer';
import { AuthService } from '../auth.service';
import { AuthController } from "../auth.controller"
import { Test } from '@nestjs/testing';
import { TokenBlacklist } from 'src/database/entities/token-blacklist.entity';


//jest.mock('../auth.service')


describe('AuthController' , () => {
  let authController: AuthController;
  let authService: AuthService;


  beforeEach(async () => {

    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        register: jest.fn(() => { }),
        login: jest.fn(() => { }),
        logout: jest.fn(() => { }),
      })
    }

    const moduleRef = await Test.createTestingModule({
      providers: [AuthService , ApiServiceProvider],
      controllers: [AuthController]
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService); 
  })

  /*describe('when register get called' , () => {
    let user: UserEntity;
    let createUserDto: CreateUserDto;
    beforeEach(async () => {
      createUserDto =  { username: 'test',email: 'test@gmail.com',password: '1234test'};
       
      const response = await authController.register(createUserDto);
    
      user = response.user;
    })

    /* test('the it should call authService' , () => {
      expect(authService.register).toBeCalledWith(createUserDto);
    })
  
    test('then it should return' , () => {
      expect(user).toEqual(getUserSample());
    }) 

  })*/


  it('calling register method' , () => {
    const dto = new CreateUserDto();
    authController.register(dto);
    expect(authService.register).toHaveBeenCalled();
    expect(authService.register).toHaveBeenCalledWith(dto);
  });

  it('calling login method' , () => {
    const req = { user: {} };
    authController.login(req);
    expect(authService.login).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith(req.user);
  });

  it('calling logout method' , () => {
    const dto = new TokenBlacklist("test-token");
    authController.logout(dto);
    expect(authService.logout).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalledWith(dto);
  });

})