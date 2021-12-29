import { Category } from './category.enum';

import { BaseEntity } from "./BaseEntity";
import { OneToMany , Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ReviewEntity } from "./review.entity";

@Entity("product")
export class ProductEntity extends BaseEntity {

  @Column()
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'int'})
  sale_price: number;

  @Column({type: 'int'})
  regular_price: number;

  @Column({type: 'int'})
  stock: number;

  @OneToMany(type => ReviewEntity , review => review.product)
  reviews: ReviewEntity[];


  @ManyToOne(type => UserEntity , user => user.added_products )
  @JoinColumn({name:'created_by_id'})
  created_by: UserEntity;

  @Column({type: 'uuid',name:'created_by_id'})
  created_by_id: string;
 
  @Column({
    type: 'enum',
    enum: Category,
    name: 'category'
  })
  category: Category;
  
  @Column("varchar",{array: true})
  tags: string[];

}
