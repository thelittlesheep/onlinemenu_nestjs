// import { type_adjustitem } from 'menu/entity/type_adjustitem.entity';
import { product } from 'menu/entity/product.entity';
import { prodtype } from '../entity/prodtype.entity';
import { prodtype_adjustitem } from '../entity/prodtype_adjustitem.entity';

// export type alltype = Tprodtype | Tproduct;

export interface Imenu<T> {
  //   Respository: Repository<T>;
  getall(): Promise<T[]>;

  getone(p: number): Promise<T>;
}

// export interface ImenuDetail extends type_adjustitem {}

// export type Tprodtype = {
//   readonly id?: number;
//   readonly name?: string;
//   readonly prods?: product[];
//   readonly adjitems?: prodtype_adjustitem[];
// };

// export type Tproduct = {
//   readonly id?: number;
//   readonly name?: string;
//   readonly type_id?: number;
//   readonly price?: number;
//   readonly prodtypes?: prodtype;
// };
