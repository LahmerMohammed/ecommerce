import { AddressEntity } from './address.entity';
import { UserEntity } from './user.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";


@Entity("purshase")
export class PurshaseEntity extends BaseEntity {


  @Column({type: 'int'})
  unit_price: number;
  
  @Column({type: 'int'})
  quntity: number;

  @ManyToOne(() => ProductEntity , {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({name: 'product_id'})
  product: ProductEntity;

  @Column({type: 'uuid',name: 'product_id'})
  product_id: string;



  @ManyToOne(() => UserEntity , {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({name:'user_id'})
  user: UserEntity;

  @Column({type: 'uuid',name:'user_id'})
  user_id: string;



  @OneToOne(() => AddressEntity , {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  shipping_address: AddressEntity; 


}