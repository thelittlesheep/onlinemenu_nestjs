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

@Entity({name:'Order'})
export class order {
  @PrimaryGeneratedColumn()
  order_id?: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id?: number;

  @ManyToMany(() => product)
  @JoinTable({
    name:'Order_Product',
    joinColumn:{
      name:'order_id',
      referencedColumnName:'order_id'
    },
    inverseJoinColumn:{
      name:'product_id',
      referencedColumnName:'product_id'
    }
  })
  products?: product[];

  @ManyToOne(() => user, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  userid?: user;
}
