import { order } from '@/menu/entity/order.entity';
import { order_product_adjustitem } from '@/menu/entity/order_product_adjustitem.entity';

export interface IuserResponseDto {
  user_id?: number;

  user_account?: string;

  user_password?: string;

  user_name?: string;

  user_email?: string;

  user_phone?: string;

  user_age?: number;

  orders?:
    | [
        {
          order_id: number;
          order_orderdate: Date;
          order_pickupdate: Date;
          order_product_quantity: number;
          order_products: [
            {
              order_product_id: number;
              order_product_quantity: number;
              product_name: string;
              order_product_adjustitem: order_product_adjustitem[];
            },
          ];
        },
      ]
    | order[];
}
