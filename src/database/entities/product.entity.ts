import { Category } from './category.enum';

import { BaseEntity } from "./BaseEntity";
import { OneToMany , Column, Entity, ManyToOne, JoinColumn, AfterLoad } from "typeorm";
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


  rating: { rate:number , count: number};

  @AfterLoad()   
  setRating() {

    if( this.reviews === undefined || !this.reviews.length)
     return;

    const count = this.reviews.length;
    
    const rate = this.reviews.reduce( (acc_rate , r) => acc_rate + r.rate,0) / count;

    this.rating = {
      rate: rate,
      count: count,
    }
  }

}
