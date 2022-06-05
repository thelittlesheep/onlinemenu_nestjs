import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { AllowAny } from 'auth/authenticaed.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { createproductDTO, updateproductDTO } from 'menu/DTO/product.DTO';
import { CheckAbilities } from 'ability/ability.decorator';
import { AbilityGuard } from 'ability/ability.guard';
import { Action } from 'ability/ability.factory';
import { user } from 'users/user.entity';
import { product } from 'menu/entity/product.entity';

@ApiTags('product')
@Controller('products')
export class productcontroller {
  constructor(protected product_Service: ProductService) {}

  @Get('')
  @AllowAny()
  @ApiOperation({
    summary: '查詢所有商品',
    description: '查詢所有商品',
  })
  getProductByCategoryGroup() {
    return this.product_Service.getProductByCategoryGroup();
  }

  @Get(':product_id')
  @ApiOperation({
    summary: '查詢一筆商品',
    description: '查詢一筆商品',
  })
  getProductbyId(@Param() queryParams: { product_id }) {
    return this.product_Service.getProductbyId(queryParams.product_id);
  }

  @Post('/')
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: product })
  @ApiBody({ type: createproductDTO })
  @ApiOperation({
    summary: '新增一筆商品',
    description: '新增一筆商品',
  })
  createProduct(@Body() product: createproductDTO) {
    return this.product_Service.createProduct(product);
  }

  @Put('/:product_id')
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: product })
  @ApiParam({ name: 'product_id' })
  @ApiOperation({
    summary: '修改一筆商品',
    description: '修改一筆商品',
  })
  updateProduct(
    @Param() queryParams: { product_id },
    @Body() product: updateproductDTO,
  ) {
    return this.product_Service.updateProduct(queryParams.product_id, product);
  }

  @Delete('/:product_id')
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Delete, subject: product })
  @ApiParam({ name: 'product_id' })
  @ApiOperation({
    summary: '刪除一筆商品',
    description: '刪除一筆商品',
  })
  deleteOrder(@Param() queryParams: { product_id }) {
    return this.product_Service.deleteProduct(queryParams.product_id);
  }
  // @Get('/detail/:id')
  // @ApiParam({
  //   name: 'id',
  //   example: '1',
  //   description:
  //     "Query an product detail profile by it's id. It will return an array.",
  // })
  // getdetail(@Param() param: { id: string }) {
  //   return this.product_Service.getproductDetail(param.id);
  // }

  //   @Get()
  //   getCategoriesAdjustitemByAdjusttype(){
  //     return this.product_Service.getCategoriesAdjustitemByAdjusttype()
  //   }
}
