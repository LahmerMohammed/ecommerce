import { Module } from "@nestjs/common";
import { ProductModule } from "./modules/product/product.module";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewModule } from "./modules/review/review.module";
import { AuthModule } from "./modules/auth/auth.module";

import typeOrmConfig = require("./config/database.config");
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from "@nestjs-modules/mailer";

require('dotenv').config({path: '.env/dev.env'})

@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ReviewModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          type: 'OAUTH2',
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        },
      }})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
