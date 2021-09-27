
import {  Entity, PrimaryColumn } from 'typeorm'



@Entity("token_blacklist")
export class TokenBlacklist {

  constructor(token: string) {
    this.token = token;
  }
  
  @PrimaryColumn()
  token: string;

}