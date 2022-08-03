import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { product } from '../entity/product.entity';
import { MenuService } from '../menu.service';
import { Repository } from 'typeorm';
import { category } from '@/menu/entity/category.entity';
import { adjusttype } from '@/menu/entity/adjusttype.entity';
import { createproductDTO, updateproductDTO } from '@/menu/DTO/product.DTO';

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

  async getProductbyId(product_id: number) {
    const product = await this.product_Respository.findOne({
      where: { product_id: product_id },
      relations: ['categoryid'],
    });
    if (product === undefined)
      throw new HttpException(`商品 product_id = ${product_id} 不存在`, 404);
    return product;
  }

  async createProduct(product: createproductDTO) {
    const res = await this.product_Respository.save(product);
    return res;
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
      .leftJoinAndSelect('adjusttype.adjustitems', 'adjustitem')
      .getMany();
  }

  async getProductByCategoryGroup() {
    const res = await this.category_Respository.find({
      join: {
        alias: 'category',
        leftJoinAndSelect: {
          product: 'category.products',
          adjusttype: 'category.adjusttypes',
          adjustitem: 'adjusttype.adjustitems',
        },
      },
    });
    // .createQueryBuilder('category')
    // .leftJoinAndSelect('category.products', 'product')
    // .leftJoinAndSelect('category.adjusttypes','adjusttype')
    // .leftJoinAndSelect('adjusttype.adjustitems','adjustitem')
    // .getMany()

    return res;
  }

  async updateProduct(product_id: number, newproduct: updateproductDTO) {
    const dbProduct = await this.product_Respository.findOne({
      where: { product_id: product_id },
    });
    const updateItems = [];
    const updateProduct = new updateproductDTO();
    Object.keys(dbProduct).forEach((i) => {
      if (Object.keys(newproduct).includes(i)) {
        updateProduct[i] = newproduct[i];
        updateItems.push(i);
      } else {
        updateProduct[i] = dbProduct[i];
      }
    });
    // 確認傳入之資料與資料庫中的資料是否相同，若相同則不更新\
    const isUpdateisSame =
      updateItems.filter((i) => dbProduct[i] !== updateProduct[i]).length === 0
        ? true
        : false;
    if (isUpdateisSame === false) {
      await this.product_Respository.update(product_id, updateProduct);
      return {
        statusCode: 200,
        message: `成功更新商品資訊`,
      };
    } else {
      throw new HttpException('資料未變動', HttpStatus.OK);
    }
  }

  async deleteProduct(product_id: number) {
    const res = await this.product_Respository.findOne({
      where: { product_id: product_id },
    });
    if (res !== undefined) {
      await this.product_Respository.delete({
        product_id: product_id,
      });
      return {
        status: 200,
        message: '訂單已成功刪除',
      };
    } else {
      throw new HttpException('該商品不存在', HttpStatus.NOT_FOUND);
    }
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
