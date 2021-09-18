import { ReviewEntity } from './review.entity';
import { AfterLoad, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BaseEntity } from "./BaseEntity";
import { ProductEntity } from "./product.entity";
import { AddressEntity } from "./address.entity";
import { Role } from './role.enum';



/**
 * TODO : add AfterLoad for 'whishlist_counter'
 */
@Entity("user")
export class UserEntity extends BaseEntity{

  @Column()
  username: string;
  
  @Column()
  password: string;

  @Column({unique:true})
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    array:true,
    default: [Role.USER],
    name:'role',
  })
  roles: Role[];


  @Column({name: 'is_email_confirmed',default:false})
  isEmailConfirmed: boolean;

  @ManyToMany(type => ProductEntity , {eager: true})
  @JoinTable()
  whishlist: ProductEntity[];

  whishlist_counter: number;


  @OneToMany(type => ProductEntity , product => product.added_by , 
  {
    eager: false,
    nullable:true,
  })
  added_products: ProductEntity[];


  @OneToOne(type => AddressEntity , {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    cascade: true
  })
  @JoinColumn({name: 'address_id'})
  address: AddressEntity;


  @OneToMany(type => ReviewEntity , review => review.user, {eager: false})
  reviews: ReviewEntity[];



  @AfterLoad()
  loadWhishlistCounter(){
      
    this.whishlist_counter = this.whishlist ? this.whishlist.length : 0 ;

  }
}