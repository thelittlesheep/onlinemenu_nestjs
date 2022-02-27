import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { prodtype_adjustitem } from './prodtype_adjustitem.entity';

@Entity()
export class adjustitem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'tinyint' })
  add: number;

  @Column({ type: 'tinyint' })
  remove: number;

  @Column({ type: 'tinyint' })
  adjust: number;

  @Column({ type: 'smallint' })
  priceadjustment: number;

  @OneToMany(
    () => prodtype_adjustitem,
    (prodtype_adjustitem) => prodtype_adjustitem.adjustitem,
    {
      nullable: false,
    },
  )
  adjitems: prodtype_adjustitem[];
}
