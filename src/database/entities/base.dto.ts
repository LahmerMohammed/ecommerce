import { Exclude } from "class-transformer";





export class BaseDto {

  @Exclude()
  id: string;
  
  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}