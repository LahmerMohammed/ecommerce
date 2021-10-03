import { BaseEntity } from 'src/database/entities/BaseEntity';
import { Column, Entity } from 'typeorm';





@Entity('payment-methode')
export class PaymentMethodeEntity extends BaseEntity {
  
  @Column()
  type: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  card_number: string;
  
  @Column()
  name: string;

  @Column({ type:'date' , nullable: true})
  exp_date: string;

  @Column({nullable: true})
  cvc: string;

} 