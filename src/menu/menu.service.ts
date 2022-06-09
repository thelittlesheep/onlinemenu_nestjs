import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

@Injectable()
export class MenuService {
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
