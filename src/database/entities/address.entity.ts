import { UserEntity } from './user.entity';
import { BaseEntity } from "src/database/entities/BaseEntity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity("address")
export class AddressEntity extends BaseEntity{
  
  @Column()
  name: string;

  @Column()
  phonenumber: string;
  
  @Column()
  address_line: string;
 
  @ManyToOne(type => UserEntity , user => user.reviews)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;
}