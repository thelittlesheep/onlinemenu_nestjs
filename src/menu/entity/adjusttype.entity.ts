import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { adjustitem } from './adjustitem.entity';
import { category } from './category.entity';

@Entity({name:'Adjusttype'})
export class adjusttype {
  @PrimaryGeneratedColumn()
  adjusttype_id?: number;

  @Column({ type: 'varchar', length: 10 })
  adjusttype_name?: string;

  @Column({ type: 'varchar', length: 10 })
  adjusttype_type?: string;

  // @Column({name:'adjustitem_id', type: 'int', select: false, nullable: true })
  // adjustitem_id?:number

  // @OneToMany(()=>adjustitem,(adjustitem)=>adjustitem.adjusttype)
  // adjustitems?:adjustitem[]

    @ManyToMany(()=>adjustitem)
    @JoinTable({
      name:'Adjusttype_Adjustitem',
      joinColumn:{
        name:'adjusttype_id',
        referencedColumnName:'adjusttype_id'
      },inverseJoinColumn:{
        name:'adjustitem_id',
        referencedColumnName:'adjustitem_id'
      }
    })
    adjustitems?:adjustitem[]
}
