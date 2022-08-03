import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { user } from '../../users/user.entity';
import { ManyToOne } from 'typeorm';
import { order_product } from './order_product.entity';

@Entity({ name: 'Order' })
export class order {
  @PrimaryColumn()
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

  @OneToMany(() => order_product, (order_product) => order_product.orders, {})
  order_products?: order_product[];
}
