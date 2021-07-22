import { BaseEntity as Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity extends Entity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date;
}