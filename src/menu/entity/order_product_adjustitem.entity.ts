import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { adjustitem } from './adjustitem.entity';
import { order_product } from './order_product.entity';

@Entity({ name: 'Order_Product_Adjustitem' })
export class order_product_adjustitem {
  @PrimaryGeneratedColumn()
  order_product_adjustitem_id?: number;

  // @Column({ name: 'order_product_id', type: 'tinyint', select: false })
  // order_product_id?: number;

  @Column({ name: 'adjustitem_id', type: 'tinyint', select: false })
  adjustitem_id?: number;

  @ManyToOne(
    () => adjustitem,
    (adjustitem) => adjustitem.order_product_adjustitem,
  )
  @JoinColumn({ name: 'adjustitem_id' })
  adjustitem?: adjustitem;

  @Column({ name: 'order_product_id', type: 'tinyint', select: false })
  order_product_id?: number;

  @ManyToOne(
    () => order_product,
    (order_product) => order_product.order_product_adjustitem,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'order_product_id' })
  order_products: order_product;
}
