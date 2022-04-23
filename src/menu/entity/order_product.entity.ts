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

  @ManyToOne(() => order, (order) => order.order_products)
  @JoinColumn({ name: 'order_id' })
  orders: order;

  @OneToMany(
    () => order_product_adjustitem,
    (order_product_adjustitem) => order_product_adjustitem.order_products,
  )
  order_product_adjustitem?: order_product_adjustitem[];

  // @ManyToMany(() => order_product_adjustitem, { cascade: true })
  // @JoinTable({
  //   name: 'Order_Product_Order_Product_Adjustitem',
  //   joinColumn: {
  //     name: 'order_product_id',
  //     referencedColumnName: 'order_product_id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'order_product_adjustitem_id',
  //     referencedColumnName: 'order_product_adjustitem_id',
  //   },
  // })
  // order_product_adjustitems?: order_product_adjustitem;
}
