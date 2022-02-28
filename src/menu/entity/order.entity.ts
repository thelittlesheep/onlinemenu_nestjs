import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { product } from './product.entity';
import { user } from './user.entity';
import { ManyToOne } from 'typeorm';

@Entity()
export class order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id?: number;

  @ManyToMany(() => product)
  @JoinTable()
  products?: product[];

  @ManyToOne(() => user, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  userid?: user;
}
