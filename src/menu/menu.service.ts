import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { prodtype } from './entity/prodtype.entity';
import { prodtype_adjustitem } from './entity/prodtype_adjustitem.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(prodtype_adjustitem, 'onlinemenu')
    private type_adjustitem_Respository: Repository<prodtype_adjustitem>,
    @InjectRepository(prodtype, 'onlinemenu')
    private prodtype_Respository: Repository<prodtype>,
  ) {}

  static async where<T>(
    querystr: string,
    condition: T,
  ): Promise<FindConditions<T>[]> {
    if (querystr != '*') {
      return [condition];
    } else {
      return [];
    }
  }

  async getTypesAndAdjustDetail(
    typeid: number,
  ): Promise<prodtype_adjustitem[]> {
    const res = await this.type_adjustitem_Respository.find({
      relations: ['type_id', 'adjustitem'],
      where: {
        t_id: typeid,
      },
    });
    return res;
  }
}
