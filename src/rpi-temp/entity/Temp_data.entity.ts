import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TempData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  logtime: Date;

  @Column({ type: 'float' })
  temp: number;
}
