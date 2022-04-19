import { product } from './product.entity';
import { category } from './category.entity';
import { adjustitem } from './adjustitem.entity';
import { user } from './user.entity';
import { order } from './order.entity';
import { adjusttype } from './adjusttype.entity';
import { order_product } from './order_product.entity';
import { order_product_adjustitem } from './order_product_adjustitem.entity';

export const menuEntities = [
  product,
  category,
  adjustitem,
  adjusttype,
  user,
  order,
  order_product,
  order_product_adjustitem,
];

export type allentitytype =
  | product
  | category
  | adjustitem
  | adjusttype
  | user
  | order
  | order_product;
