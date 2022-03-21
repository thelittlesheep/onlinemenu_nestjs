import { product } from './product.entity';
import { category } from './category.entity';
import { adjustitem } from './adjustitem.entity';
import { user } from './user.entity';
import { order } from './order.entity';
import { adjusttype } from './adjusttype.entity';

export const menuEntities = [
  product,
  category,
  adjustitem,
  adjusttype,
  user,
  order,
];

export type allentitytype =
  | product
  | category
  | adjustitem
  | adjusttype
  | user
  | order;
