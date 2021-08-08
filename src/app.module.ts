import { Module } from "@nestjs/common";
import { ProductModule } from "./modules/product/product.module";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewModule } from "./modules/review/review.module";
import { AuthModule } from "./modules/auth/auth.module";

import typeOrmConfig = require("./config/database.config");
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from "@nestjs-modules/mailer";
import { MailModule } from './modules/mail/mail.module';


@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ReviewModule,
    AuthModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
