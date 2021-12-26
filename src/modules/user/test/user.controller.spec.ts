import { RolesGuard } from '../../../guards/role.guard';
import { CanActivate } from '@nestjs/common';
import { ProductModule } from '../../product/product.module';
import { ProductService } from '../../product/product.service';
import { getProductStub } from './samples/user.sample';
import { UserEntity } from '../../../database/entities/user.entity';
import { getUpdateWhistlistStub } from './samples/update-whishlist.stub';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { Test } from '@nestjs/testing';
import { ACTION } from '../dtos/update-user-whishlist.dto';


jest.mock('../user.service');



describe('UserController' , () => {

  let userController: UserController;
  let userService:  UserService;

  beforeEach( async() => {


   const mock_RoleGuard: CanActivate = { canActivate: () => true};

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
    .overrideGuard(RolesGuard).useValue(mock_RoleGuard)
    .compile();

    userController = moduleRef.get<UserController>(UserController);
    userService =  moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  })

  describe('when update user whishlist called' , () => {

    describe('to add a product to user whishlist', () => {
      
      let user: UserEntity;

      beforeEach( async () => {
        user = await userController.updateUserWhishList(getUpdateWhistlistStub(ACTION.ADD));
      })

      
      /* test('then it should call userService' , () => {
        expect(userService.updateUserWhistlist).toBeCalledWith(getUpdateWhistlistStub(ACTION.ADD))
      });

      test('and should return user with added product ' , () => {
        expect(user.whishlist).toContainEqual(getProductStub())
      }) */

    })
    
    
  })

})