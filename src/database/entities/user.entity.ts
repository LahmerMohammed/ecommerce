import { ReviewEntity } from './review.entity';
import { AfterLoad, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BaseEntity } from "./BaseEntity";
import { ProductEntity } from "./product.entity";
import { AddressEntity } from "./address.entity";


// temporary 
export enum Roles {
  USER="user",
  ADMIN="admin",
  SUPER_ADMIN="super_admin",
}


/**
 * TODO : add AfterLoad for 'whishlist_counter'
 */
@Entity("user")
export class UserEntity extends BaseEntity{

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({unique:true})
  username: string;

  @Column({
    type: 'date',
  })
  birthdate: Date;

  @Column()
  password: string;

  @Column({unique:true})
  email: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
    enumName: 'roles',
  })
  role: Roles;


  @ManyToMany(type => ProductEntity , {eager: true})
  @JoinTable()
  whishlist: ProductEntity[];

  whishlist_counter: number;


  @OneToMany(type => ProductEntity , product => product.added_by_admin , 
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password,10);
  } 


  

  /*Hmmm*/
  @OneToMany(type => ReviewEntity , review => review.user, {eager: false})
  reviews: ReviewEntity[];


  @AfterLoad()
  loadWhishlistCounter(){
      
    this.whishlist_counter = this.whishlist ? this.whishlist.length : 0 ;

  }
}