import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

class order_product_adjustitem_schema {
  @ApiProperty()
  adjustitem_id?: number;
  @ApiProperty()
  adjustitem_name?: number;
  @ApiProperty()
  adjustitem_priceadjust?: number;
  @ApiProperty()
  adjusttype_id?: number;
}
export class order_products_schema {
  @ApiProperty()
  order_product_id?: number;
  @ApiProperty()
  order_product_quantity?: number;
  @ApiProperty({ type: [order_product_adjustitem_schema] })
  order_product_adjustitem?: order_product_adjustitem_schema[];
}
export class orderInfoDTO {
  @IsNumber()
  @ApiProperty()
  order_id?: number;
  @IsNumber()
  @ApiProperty()
  order_quantity?: number;
  @ApiProperty()
  order_orderdate?: string;
  @ApiProperty()
  order_pickupdate?: string;
  @IsArray()
  @ApiProperty({
    type: [order_products_schema],
  })
  order_products?: order_products_schema[];
}
export class orderCreateDTO extends orderInfoDTO {
  @IsNumber()
  @ApiProperty()
  user_id?: number;
}
