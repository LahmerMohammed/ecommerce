import { UserEntity } from './user.entity';
import { BaseEntity } from "src/database/entities/BaseEntity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

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

  @ManyToOne(type => UserEntity , user => user.reviews)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;
}