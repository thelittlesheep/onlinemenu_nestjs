import {
  Column,
  JoinTable,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { prodtype } from './prodtype.entity';

@Entity()
export class product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'type_id', type: 'tinyint', select: false })
  type_id: number;

  @Column({ type: 'smallint' })
  price: string;

  @ManyToOne(() => prodtype, (prodtype) => prodtype.prods, {
    nullable: false,
  })
  @JoinColumn({ name: 'type_id' })
  prodtypes: prodtype;
}
