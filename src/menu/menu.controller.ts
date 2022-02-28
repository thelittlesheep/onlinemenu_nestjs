import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ProductService } from './service/product.service';

@Controller()
export class MenuController {
  constructor(
    private menu_Service: MenuService,
    private product_Service: ProductService,
  ) {}

  @Get('typedetail/:id')
  gettypedetail(@Param() param: { id: number }) {
    return this.menu_Service.getTypesAndAdjustDetail(param.id);
  }

  @Get('productbyid/:id')
  getproductbyid(@Param() param: { id }) {
    return this.product_Service.getproductbyid(param.id);
  }

  @Get('productbyname/:name')
  getproductbyname(@Param() param: { name }) {
    return this.product_Service.getproductbyname(param.name);
  }

  @Get(':id')
  getdetail(@Param() param: { id }) {
    return this.product_Service.getproductDetail(param.id);
  }
}
