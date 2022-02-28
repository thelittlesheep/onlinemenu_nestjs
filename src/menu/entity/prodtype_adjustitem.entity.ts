import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { adjustitem } from './adjustitem.entity';
import { prodtype } from './prodtype.entity';
@Entity()
export class prodtype_adjustitem {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 't_id', type: 'int', select: false })
  t_id?: number;

  @Column({ name: 'a_id', type: 'int', select: false })
  a_id?: number;

  @ManyToOne(() => prodtype, (prodtype) => prodtype.adjitems, {
    nullable: false,
  })
  @JoinColumn({ name: 't_id' })
  type_id?: prodtype;

  @ManyToOne(() => adjustitem, (adjustitem) => adjustitem.adjitems, {
    nullable: false,
  })
  @JoinColumn({ name: 'a_id' })
  adjustitem?: adjustitem;
}
