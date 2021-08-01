import { Module } from "@nestjs/common";
import { ProductModule } from "./modules/product/product.module";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewModule } from "./modules/review/review.module";
import { AuthModule } from "./modules/auth/auth.module";
import { getOptions } from "./database/init-connection";

@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule.forRoot(getOptions()),
    ReviewModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
