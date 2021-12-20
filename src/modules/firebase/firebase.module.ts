import { FirebaseService } from './firebase.service';
import { Module } from "@nestjs/common";




@Module({
  exports: [FirebaseService],
  providers: [FirebaseService],
  
})
export class FirebaseModule{}