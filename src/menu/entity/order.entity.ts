import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { user } from './user.entity';
import { ManyToOne } from 'typeorm';
import { order_product } from './order_product.entity';

@Entity({ name: 'Order' })
export class order {
  @PrimaryGeneratedColumn()
  order_id?: number;

  @Column({ type: 'datetime' })
  order_orderdate?: string;

  @Column({ type: 'datetime' })
  order_pickupdate?: string;

  @Column({ type: 'tinyint' })
  order_quantity?: number;

  // Create Relation with [User] Table
  @Column({ name: 'user_id', type: 'int' })
  user_id?: number;

  @ManyToOne(() => user, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  userid?: user;

  @OneToMany(() => order_product, (order_product) => order_product.orders)
  order_products?: order_product[];

  // @ManyToMany(() => product)
  // @JoinTable({
  //   name: 'Order_Product',
  //   joinColumn: {
  //     name: 'order_id',
  //     referencedColumnName: 'order_id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'product_id',
  //     referencedColumnName: 'product_id',
  //   },
  // })
  // products?: product[];
}
