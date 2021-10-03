import { ManyToOne } from 'typeorm';
import { AddressEntity } from 'src/database/entities/address.entity';
import { ORDER_STATUS } from './order-status.enum';
import { BaseEntity } from 'src/database/entities/BaseEntity';
import { Column, Entity, OneToOne } from 'typeorm';



@Entity('order')
export class OrderEntity extends BaseEntity {


  @Column({
    enum: ORDER_STATUS
  })
  status: ORDER_STATUS;

  @Column({type: 'timestamp'})
  purshase_date: string;


 /*  @Column({name: 'shipping_address_id'})
  @ManyToOne(type => AddressEntity)
  shipping_address: AddressEntity; */

  @Column({type: 'int'})
  subtotal_price: number;

  @Column({type:'int'})
  shipping_fee: number;

  @Column({type: 'int'})
  discount: number;

  
  total_price: number;



  
}