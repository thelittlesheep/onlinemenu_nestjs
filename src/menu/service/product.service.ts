import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allentitytype } from 'menu/entity';
import { product } from 'menu/entity/product.entity';
import { MenuService } from 'menu/menu.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(product, 'onlinemenu')
    private product_Respository: Repository<product>,
  ) {}

  async getproductbyid(productid: string) {
    const getproductbyid = new getproductby(
      productid,
      { id: productid as unknown as number },
      this.product_Respository,
    ).getproduct();
    return getproductbyid;
  }

  async getproductbyname(productname: string) {
    const getproductbyid = new getproductby(
      productname,
      { name: productname },
      this.product_Respository,
    ).getproduct();
    return getproductbyid;
  }

  async getproductDetail(productid) {
    console.log(productid);

    const tempquery = await this.product_Respository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.prodtypes', 'prodtypes')
      .leftJoinAndSelect('prodtypes.adjitems', 'adjitems')
      .leftJoinAndSelect('adjitems.adjustitem', 'a_id')
      .select(['product', 'prodtypes', 'adjitems', 'a_id']);
    if (productid != '*') {
      tempquery.where('product.id=:id', { id: productid });
    }
    const res = tempquery.getMany();
    return res;
  }
}

class getproductby {
  constructor(
    private querystring: string,
    private condition: product,
    private Respository: Repository<product>,
  ) {}

  async getproduct(): Promise<product[]> {
    const ifwhere = await MenuService.where<product>(
      this.querystring,
      this.condition,
    );

    const res = await this.Respository.find({
      join: {
        alias: 'product',
        leftJoinAndSelect: {
          prodtype: 'product.prodtypes',
        },
      },
      where: ifwhere,
    });
    return res;
  }
}
