import { Exclude, Expose } from "class-transformer";


// No more need for this 

// must be deleted


Exclude()
export class BaseDto {

  @Exclude()
  id: string;
  
  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}