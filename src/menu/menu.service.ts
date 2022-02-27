import { Injectable } from '@nestjs/common';
import { getConnectionName, InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { product } from './entity/product.entity';
// import { ProductsService } from './service/products.service';
// import { ImenuDetail } from './interface/menu.interface';
import { prodtype } from './entity/prodtype.entity';
import { prodtype_adjustitem } from './entity/prodtype_adjustitem.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(product, 'onlinemenu')
    private product_Respository: Repository<product>,
    @InjectRepository(prodtype_adjustitem, 'onlinemenu')
    private type_adjustitem_Respository: Repository<prodtype_adjustitem>,
    @InjectRepository(prodtype, 'onlinemenu')
    private prodtype_Respository: Repository<prodtype>,
  ) {}

  async getdetail(p?: string): Promise<any> {
    // const res = await this.product_Respository
    //   .createQueryBuilder('p')
    //   .leftJoinAndSelect('p.type', 't')
    //   .where('p.name = :name', { name: p })
    //   .getMany();
    // return res;
    const relares = await this.prodtype_Respository.find({
      relations: ['prods'],
    });
    const mpres = await this.prodtype_Respository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.prods', 'prods')
      .leftJoinAndSelect('product.adjitems', 'adjitems')
      .leftJoinAndSelect('adjitems.adjustitem', 'a_id')
      .select(['product', 'prods', 'adjitems', 'a_id'])
      .where('product.id=:id', { id: 1 })
      .getMany();

    const mpresajd = await this.product_Respository.find({
      join: {
        alias: 'product',
        leftJoinAndSelect: {
          prodtype: 'product.prodtypes',
        },
      },
    });
    return mpres;
  }

  async gettypes(): Promise<any> {
    const res = await this.type_adjustitem_Respository.find({
      relations: ['t_id', 'a_id'],
      where: {
        t_id: '2',
      },
    });
    return res;
  }
}
