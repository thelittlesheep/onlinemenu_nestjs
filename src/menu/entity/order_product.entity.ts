import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { product } from './product.entity';
import { order } from './order.entity';
import { order_product_adjustitem } from './order_product_adjustitem.entity';
import { OneToMany } from 'typeorm';

@Entity({ name: 'Order_Product' })
export class order_product {
  @PrimaryGeneratedColumn()
  order_product_id?: number;

  @Column({ type: 'tinyint' })
  order_product_quantity?: number;

  @Column({ name: 'product_id', type: 'tinyint', select: false })
  product_id?: number;

  @Column({ name: 'order_id', type: 'tinyint', select: false })
  order_id?: number;

  @ManyToOne(() => product, (product) => product.Order_Product)
  @JoinColumn({ name: 'product_id' })
  product: product;

  @ManyToOne(() => order, (order) => order.order_products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  orders: order;

  @OneToMany(
    () => order_product_adjustitem,
    (order_product_adjustitem) => order_product_adjustitem.order_products,
  )
  order_product_adjustitem?: order_product_adjustitem[];
}
