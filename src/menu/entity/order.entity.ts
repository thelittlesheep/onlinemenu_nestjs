import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { product } from './product.entity';
import { user } from './user.entity';

@Entity()
export class order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'user_id', type: 'tinyint', select: false })
  user_id?: number;

  @ManyToMany(() => product)
  @JoinTable()
  products?: product[];

  @OneToMany(() => user, (user) => user.orders, { nullable: false })
  users?: user[];
}
