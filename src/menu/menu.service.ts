import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor() // private type_adjustitem_Respository: Repository<prodtype_adjustitem>, // @InjectRepository(prodtype_adjustitem, 'onlinemenu')
  // @InjectRepository(prodtype, 'onlinemenu')
  // private prodtype_Respository: Repository<prodtype>,
  {}

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

  // async getTypesAndAdjustDetail(
  //   typeid: number,
  // ): Promise<prodtype_adjustitem[]> {
  //   const res = await this.type_adjustitem_Respository.find({
  //     relations: ['type_id', 'adjustitem'],
  //     where: {
  //       t_id: typeid,
  //     },
  //   });
  //   return res;
  // }
}
