import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { adjustitem } from './adjustitem.entity';
import { order } from './order.entity';
import { order_product } from './order_product.entity';

@Entity({ name: 'Order_Product_Adjustitem' })
export class order_product_adjustitem {
  @PrimaryGeneratedColumn()
  order_product_adjustitem_id?: number;

  // @Column({ name: 'order_product_id', type: 'tinyint', select: false })
  // order_product_id?: number;

  @Column({ name: 'adjustitem_id', type: 'tinyint', select: false })
  adjustitem_id?: number;

  @OneToMany(
    () => adjustitem,
    (adjustitem) => adjustitem.order_product_adjustitems,
  )
  adjustitems?: adjustitem;

  @Column({ name: 'order_product_id', type: 'tinyint', select: false })
  order_product_id?: number;

  @ManyToOne(
    () => order_product,
    (order_product) => order_product.order_product_adjustitems,
  )
  @JoinColumn({ name: 'order_product_id' })
  order_products: order_product;
}