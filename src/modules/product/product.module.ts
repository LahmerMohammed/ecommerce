import { UserModule } from './../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from 'src/database/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]) , forwardRef(() => UserModule) ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
