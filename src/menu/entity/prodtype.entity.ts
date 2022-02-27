import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { product } from './product.entity';
import { prodtype_adjustitem } from './prodtype_adjustitem.entity';

@Entity()
export class prodtype {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => product, (products) => products.prodtypes)
  prods: product[];

  @OneToMany(
    () => prodtype_adjustitem,
    (prodtype_adjustitem) => prodtype_adjustitem.type_id,
    {
      nullable: false,
    },
  )
  adjitems: prodtype_adjustitem[];
}
