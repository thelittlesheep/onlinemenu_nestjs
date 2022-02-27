// import { type_adjustitem } from 'menu/entity/type_adjustitem.entity';

type menuDetail = { x: number } | { y: number };

export interface Imenu<T> {
  //   Respository: Repository<T>;
  getall(): Promise<T[]>;

  getone(p: number): Promise<T>;
}

// export interface ImenuDetail extends type_adjustitem {}
