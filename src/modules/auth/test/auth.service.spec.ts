import { TokenBlacklist } from 'src/database/entities/token-blacklist.entity';
import { CreateUserDto } from './../../user/dtos/user/create-user.dto';
import { UserEntity } from 'src/database/entities/user.entity';

import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from '../auth.service';


class ApiServiceMock {
  login(dto: UserEntity) {
     return {};
  }
  register(dto: CreateUserDto) {
    return {};
  }
  logout(id: string) {
    return null;
  }
}

describe('AuthService' , () => {
  let service: AuthService;

  beforeEach(async () => {
    
    const ApiServiceProvider = {
      provide: AuthService,
      useClass: ApiServiceMock,
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, ApiServiceProvider],
      imports: [HttpModule],
    }).compile();

    // getting service from main module
    service = module.get<AuthService>(AuthService);
  });

  it('AuthService - should be defined' , () => {
    expect(service).toBeDefined();
  })

  it('should call login with expected params', async() => {
    const loginSpy = jest.spyOn(service , 'login');
    const dto = new UserEntity();
    service.login(dto);
    expect(loginSpy).toHaveBeenCalledWith(dto);
  });

  it('should call register with expected params', async() => {
    const registerSpy = jest.spyOn(service,'register');
    const dto = new CreateUserDto();
    service.register(dto);
    expect(registerSpy).toHaveBeenCalledWith(dto);
  });

  it('should call logout with expected params', () => {
    const logoutSpy = jest.spyOn(service , 'logout');
    const dto = new TokenBlacklist('token');
    service.logout(dto);
    expect(logoutSpy).toHaveBeenCalledWith(dto);
  });


})