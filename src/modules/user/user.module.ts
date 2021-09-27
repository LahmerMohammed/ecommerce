import { UserEntity } from 'src/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AddressEntity } from 'src/database/entities/address.entity';
import { ProductModule } from '../product/product.module';
import { TokenBlacklist } from 'src/database/entities/token-blacklist.entity';
import { JwtModule } from '@nestjs/jwt';

require('dotenv').config('.env/dev.env')


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,AddressEntity,TokenBlacklist]),
  forwardRef(() => ProductModule),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions:{
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
