import {
  Column,
  JoinTable,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { prodtype } from './prodtype.entity';
// import { Tproduct } from 'menu/interface/menu.interface';

@Entity()
export class product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 20 })
  name?: string;

  @Column({ name: 'type_id', type: 'tinyint', select: false })
  type_id?: number;

  @Column({ type: 'smallint' })
  price?: number;

  @ManyToOne(() => prodtype, (prodtype) => prodtype.prods, {
    nullable: false,
  })
  @JoinColumn({ name: 'type_id' })
  prodtypes?: prodtype;
}
