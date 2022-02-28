import { product } from './product.entity';
import { prodtype } from './prodtype.entity';
import { prodtype_adjustitem } from './prodtype_adjustitem.entity';
import { adjustitem } from './adjustitem.entity';
import { user } from './user.entity';
import { order } from './order.entity';

export const menuEntities = [
  product,
  prodtype,
  prodtype_adjustitem,
  adjustitem,
  user,
  order,
];

export type allentitytype =
  | product
  | prodtype
  | prodtype_adjustitem
  | adjustitem
  | user
  | order;
