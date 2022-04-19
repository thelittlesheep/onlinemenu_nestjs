import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { adjusttype } from './adjusttype.entity';
import { category } from './category.entity';
import { order_product_adjustitem } from './order_product_adjustitem.entity';

@Entity({ name: 'Adjustitem' })
export class adjustitem {
  @PrimaryGeneratedColumn()
  adjustitem_id?: number;

  @Column({ type: 'varchar', length: 10 })
  adjustitem_name?: string;

  @Column({ type: 'smallint' })
  adjustitem_priceadjust?: number;

  @Column({ name: 'adjusttype_id', type: 'tinyint' })
  adjusttype_id?: number;

  @ManyToOne(
    () => order_product_adjustitem,
    (order_product_adjustitem) => order_product_adjustitem.adjustitems,
  )
  order_product_adjustitems?: order_product_adjustitem;

  // @ManyToOne(() => adjusttype, (adjusttype) => adjusttype.adjustitems, { nullable: false })
  // @JoinColumn({ name: 'adjusttype_id' })
  // adjusttype?: adjusttype;

  // @ManyToMany(()=>adjusttype)
  // @JoinTable({
  //   name:'Adjusttype_Adjustitem',
  //   joinColumn:{
  //     name:'adjustitem_id',
  //     referencedColumnName:'adjustitem_id'
  //   },inverseJoinColumn:{
  //     name:'adjusttype_id',
  //     referencedColumnName:'adjusttype_id'
  //   }
  // })
  // adjusttypes?:adjusttype[]
}
