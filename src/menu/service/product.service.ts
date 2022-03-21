import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allentitytype } from '../entity';
import { product } from '../entity/product.entity';
import { MenuService } from '../menu.service';
import { Repository } from 'typeorm';
import { category } from 'menu/entity/category.entity';
import { adjustitem } from 'menu/entity/adjustitem.entity';
import { adjusttype } from 'menu/entity/adjusttype.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(product, 'onlinemenu')
    private product_Respository: Repository<product>,
    @InjectRepository(category, 'onlinemenu')
    private category_Respository: Repository<category>,
    @InjectRepository(adjusttype, 'onlinemenu')
    private adjusttype_Respository: Repository<adjusttype>,
  ) {}

  async getproductbyid(productid: string) {
    const getproductbyid = new getproductby(
      productid,
      { product_id: productid as unknown as number },
      this.product_Respository,
    ).getproduct();
    return getproductbyid;
  }

  async getproductbyname(productname: string) {
    const getproductbyid = new getproductby(
      productname,
      { product_name: productname },
      this.product_Respository,
    ).getproduct();
    return getproductbyid;
  }

  async getproductDetail(productid) {
    const tempquery = this.product_Respository
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

  async getCategoriesAdjustitemByAdjusttype() {
    return await this.adjusttype_Respository
    .createQueryBuilder('adjusttype')
    .leftJoinAndSelect('adjusttype.adjustitems','adjustitem')
    .getMany()
  }

  async getProductByCategoryGroup(){
    const res = await this.category_Respository
    .find({
      join:{
        alias:'category',
        leftJoinAndSelect:{
          product:'category.products',
          adjusttype:'category.adjusttypes',
          adjustitem:'adjusttype.adjustitems',
        }
      },
    })
    // .createQueryBuilder('category')
    // .leftJoinAndSelect('category.products', 'product')
    // .leftJoinAndSelect('category.adjusttypes','adjusttype')
    // .leftJoinAndSelect('adjusttype.adjustitems','adjustitem')
    // .getMany()

    return res
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


