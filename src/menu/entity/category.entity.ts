import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { product } from './product.entity';
import { adjustitem } from './adjustitem.entity';
import { adjusttype } from './adjusttype.entity';

@Entity({ name: 'Category' })
export class category {
  @PrimaryGeneratedColumn()
  category_id?: number;

  @Column({ type: 'varchar', length: 20 })
  category_name?: string;

  @OneToMany(() => product, (products) => products.categoryid)
  products?: product[];

  @OneToMany(() => adjusttype, (adjusttypes) => adjusttypes.categoryid)
  adjusttypes?: adjusttype[];

  // @ManyToMany(() => adjusttype)
  // @JoinTable({
  //   name: 'Category_Adjusttype',
  //   joinColumn: {
  //     name: 'category_id',
  //     referencedColumnName: 'category_id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'adjusttype_id',
  //     referencedColumnName: 'adjusttype_id',
  //   },
  // })
  // adjusttypes?: adjusttype[];
}
