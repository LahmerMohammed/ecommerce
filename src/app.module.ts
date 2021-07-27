import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewModule } from './modules/review/review.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule.forRoot(),
    ReviewModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
