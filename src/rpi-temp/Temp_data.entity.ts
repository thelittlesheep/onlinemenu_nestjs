import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Temp_data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  logtime: Date;

  @Column({ type: 'float' })
  temp: number;
}
