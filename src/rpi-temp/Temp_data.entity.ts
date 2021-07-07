import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Temp_data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  logtime: Date;

  @Column()
  temp: number;

  @Column()
  test: number;
}
