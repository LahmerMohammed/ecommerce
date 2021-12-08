import { FirebaseService } from './firebase.service';
import { Module } from "@nestjs/common";









@Module({
  exports: [FirebaseService],
  imports: [FirebaseService],
})
export class FirebaseModule{}