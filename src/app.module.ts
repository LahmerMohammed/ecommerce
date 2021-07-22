import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewModule } from './modules/review/review.module';


@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule.forRoot(),
    ReviewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
