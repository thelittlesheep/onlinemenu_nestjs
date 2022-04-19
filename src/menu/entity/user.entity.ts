import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { order } from './order.entity';
import { OneToMany } from 'typeorm';

@Entity({ name: 'User' })
export class user {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column({ type: 'varchar', length: 20 })
  user_account?: string;

  @Column({ type: 'varchar', length: 20 })
  user_password?: string;

  @Column({ type: 'varchar', length: 20, default: '' })
  user_name?: string;

  @Column({ type: 'varchar', length: 30, default: '' })
  user_email?: string;

  @Column({ type: 'varchar', length: 20, default: '' })
  user_phone?: string;

  @Column({ default: 0 })
  user_age?: number;

  // Foreign Key
  // @Column({ name: 'order_id', type: 'int', select: false, nullable: true })
  // order_id?: number;

  @OneToMany(() => order, (order) => order.userid, { nullable: false })
  orders?: order[];
}
