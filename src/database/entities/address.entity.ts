import { BaseEntity } from "src/database/entities/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity("address")
export class AddressEntity extends BaseEntity{
  
  @Column()
  street: string;

  @Column()
  country: string;
  
  @Column()
  city: string;
  
  @Column()
  town: string;
  
  @Column()
  zipcode: string;
}