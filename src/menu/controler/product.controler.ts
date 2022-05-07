import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { ProductService } from '../service/product.service';
import { apiResponseDto } from '../apiresponse';
import { AllowAny } from 'auth/authenticaed.decorator';

@Controller('product')
export class productcontroller {
  constructor(protected product_Service: ProductService) {}
  // @Get('productbyid/:id')
  // @ApiParam({
  //   name: 'id',
  //   example: '1',
  //   description:
  //     "Query an product basic profile by it's id. It will return an array.",
  // })
  // getproductbyid(@Param() param: { id: string }) {
  //   return this.product_Service.getproductbyid(param.id);
  // }

  // @Get('productbyname/:name')
  // @ApiParam({
  //   name: 'name',
  //   example: '嫩汁雞排美式堡',
  //   description:
  //     "Query an product basic profile by it's name. It will return an array.",
  // })
  // @ApiCreatedResponse({
  //   description: 'test',
  //   type: apiResponseDto.productResponseDto,
  // })
  // getproductbyname(@Param() param: { name: string }) {
  //   return this.product_Service.getproductbyname(param.name);
  // }

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   example: '1',
  //   description:
  //     "Query an product detail profile by it's id. It will return an array.",
  // })
  // getdetail(@Param() param: { id: string }) {
  //   return this.product_Service.getproductDetail(param.id);
  // }

  @Get()
  @AllowAny()
  getProductByCategoryGroup() {
    return this.product_Service.getProductByCategoryGroup();
  }

  //   @Get()
  //   getCategoriesAdjustitemByAdjusttype(){
  //     return this.product_Service.getCategoriesAdjustitemByAdjusttype()
  //   }
}
