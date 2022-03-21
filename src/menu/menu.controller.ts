import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ProductService } from './service/product.service';
import { UserService } from './service/user.service';

@Controller()
export class MenuController {
  constructor(
    private menu_Service: MenuService,
    protected user_Service: UserService,
    protected product_Service: ProductService,
  ) {}
  // @Get('typedetail/:id')
  // gettypedetail(@Param() param: { id: number }) {
  //   return this.menu_Service.getTypesAndAdjustDetail(param.id);
  // }
}
