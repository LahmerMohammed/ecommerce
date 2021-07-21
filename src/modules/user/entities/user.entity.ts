import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BaseEntity } from "src/shared/entities/BaseEntity";


@Entity("user")
export class UserEntity extends BaseEntity{

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({primary: true,nullable: false,unique:true})
  username: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  birthdate: Date;

  @Column({nullable: false})
  password: string;

  @PrimaryColumn()
  @Column({nullable: false,unique:true})
  email: string;


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password,10);
  } 
  
}