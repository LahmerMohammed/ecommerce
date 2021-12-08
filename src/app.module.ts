import { FirebaseModule } from './modules/firebase/firebase.module';
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
import { ScheduleModule } from "@nestjs/schedule";


@Module({
  imports: [
    ProductModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ReviewModule,
    AuthModule,
    MailModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./.env/dev.env']
    }),
    FirebaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
