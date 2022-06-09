import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { order_product_adjustitem } from './order_product_adjustitem.entity';

@Entity({ name: 'Adjustitem' })
export class adjustitem {
  @PrimaryGeneratedColumn()
  adjustitem_id?: number;

  @Column({ type: 'varchar', length: 10 })
  adjustitem_name?: string;

  @Column({ type: 'smallint' })
  adjustitem_priceadjust?: number;

  @OneToMany(
    () => order_product_adjustitem,
    (order_product_adjustitem) => order_product_adjustitem.adjustitem,
  )
  @JoinColumn({ name: 'order_product_adjustitem_id' })
  order_product_adjustitem?: order_product_adjustitem;

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
