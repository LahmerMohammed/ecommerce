import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';


@Module({
  imports: [ProductModule, UserModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
