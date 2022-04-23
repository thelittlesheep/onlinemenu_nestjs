import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class orderDTO {
  @IsNumber()
  @ApiProperty()
  user_id?: number;
  @IsNumber()
  @ApiProperty()
  order_quantity?: number;
  @ApiProperty()
  order_orderdate?: string;
  @ApiProperty()
  order_pickupdate?: string;
  @IsArray()
  @ApiProperty()
  order_products?: Array<{
    product_id?: number;
    shoppingProduct_qty?: number;
    shoppingProduct_adjustitems?: Array<{
      adjustitem_id: number;
      adjustitem_name: string;
      adjustitem_priceadjust: number;
      adjusttype_id?: number;
    }>;
  }>;
}
