import { ReviewEntity } from './review.entity';
import { AfterLoad, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BaseEntity } from "./BaseEntity";
import { ProductEntity } from "./product.entity";
import { AddressEntity } from "./address.entity";
import { Role } from './role.enum';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';




@Entity("user")
export class UserEntity extends BaseEntity{

  @Column()
  username: string;
  
  @Column()
  password: string;

  @Column({type: 'date' , nullable: true})
  birthdate: string;

  @Column({nullable: true})
  phonenumber: string;

  @Column({unique:true})
  email: string;

  @Column('enum',{
    enum: Role,
    array:true,
    default: [Role.USER],
    name:'role',
  })
  role: Role[];


  @Column({name: 'is_email_confirmed',default:false})
  isEmailConfirmed: boolean;

  @ManyToMany(type => ProductEntity , {eager: true})
  @JoinTable()
  whishlist: ProductEntity[];

  whishlist_counter: number;


  @OneToMany(type => ProductEntity , product => product.created_by , 
  {
    eager: false,
    nullable:true,
  })
  added_products: ProductEntity[];


  @OneToMany(type => AddressEntity , address => address.user)
  addresses: AddressEntity[];


  @OneToMany(type => ReviewEntity , review => review.user, {eager: false})
  reviews: ReviewEntity[];



  @AfterLoad()
  loadWhishlistCounter(){
    this.whishlist_counter = this.whishlist ? this.whishlist.length : 0;
  }
}