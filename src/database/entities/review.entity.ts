import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";



@Entity('review')
export class ReviewEntity extends BaseEntity {


  @Column({
    type: 'int',
    nullable: true,
  })
  rate: number;

  @Column({
    type:'text',
    nullable: true,
  })
  comment: string 

  @ManyToOne(type => UserEntity , user => user.reviews)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

  @Column({type: 'uuid',name:'user_id'})
  user_id: string;


  
  @ManyToOne(type => ProductEntity , product => product.reviews)
  @JoinColumn({name:'product_id'})
  product: ProductEntity;

  @Column({type: 'uuid',name:'product_id'})
  product_id: string;
}