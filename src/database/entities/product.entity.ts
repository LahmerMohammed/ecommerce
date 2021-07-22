
import { BaseEntity } from "./BaseEntity";
import { OneToMany , Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ReviewEntity } from "./review.entity";

@Entity("product")
export class ProductEntity extends BaseEntity {

  @Column()
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'int'})
  price: number;

  @Column({type: 'int'})
  quantity: number;

  @OneToMany(type => ReviewEntity , review => review.product)
  reviews: ReviewEntity[];


  @ManyToOne(type => UserEntity , user => user.added_products)
  added_by_admin: UserEntity;

  @Column({type: 'uuid'})
  added_by_admin_id: string;
}
