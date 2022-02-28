import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { order } from './order.entity';

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 20 })
  firstname?: string;

  @Column({ type: 'varchar', length: 20 })
  lastname?: string;

  @Column({ type: 'varchar', length: 20 })
  phone?: string;

  @Column()
  age?: number;

  @Column({ type: 'varchar', length: 10 })
  gender?: string;

  @Column({ type: 'varchar', length: 30 })
  mail?: string;

  @Column({ name: 'order_id', type: 'int', select: false, nullable: true })
  order_id?: number;

  @ManyToOne(() => order, (order) => order.users, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  orders?: order;
}
