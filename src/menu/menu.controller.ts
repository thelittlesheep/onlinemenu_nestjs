import { Controller, Get, Param, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
// import { ProductsService } from './service/products.service';
// import { ProductTypesService } from './service/types.service';
// import { product_types } from './entity/product_types.entity';

@Controller()
export class MenuController {
  constructor(
    private readonly menu_Service: MenuService, // private readonly products_Service: ProductsService, // private readonly types_Service: ProductTypesService,
  ) {}

  // @Get('msgd')
  // getdatams() {
  //   return this.menu_Service.getallextend();
  // }
  @Get('ms/:name')
  getdataps(@Param() param: { name }) {
    return this.menu_Service.getdetail(param.name);
  }
  @Get('msptp')
  getdatamsptp(@Param() param: { name }) {
    return this.menu_Service.getdetail();
  }
  @Get('ms')
  gettypes(@Param() param: { name }) {
    return this.menu_Service.gettypes();
  }
  // @Get('ts')
  // getdatats() {
  //   return this.types_Service.getall();
  // }

  // @Get('ts/:id')
  // getonets(@Param() param: { id: number }) {
  //   return this.types_Service.getone(param.id);
  // }

  // @Get('qs')
  // getonetsqs(@Query() query: product_types) {
  //   console.log(query);

  //   return this.types_Service.getone(query.id);
  // }
}
