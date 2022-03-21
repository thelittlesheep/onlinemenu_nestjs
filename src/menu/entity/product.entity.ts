import {
  Column,
  JoinTable,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { category } from './category.entity';
// import { Tproduct } from 'menu/interface/menu.interface';
import { ApiProperty } from '@nestjs/swagger';



@Entity({name:'Product'})
export class product {
  @PrimaryGeneratedColumn()
  product_id?: number;

  @Column({ type: 'varchar', length: 20 })
  product_name?: string;

  @Column({ type: 'smallint' })
  product_price?: number;

  @Column({ name: 'category_id', type: 'tinyint', select: false })
  category_id?: number;

  @Column({ type: 'text'})
  product_image?:string

  @ManyToOne(() => category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  categoryid?: category;
}
