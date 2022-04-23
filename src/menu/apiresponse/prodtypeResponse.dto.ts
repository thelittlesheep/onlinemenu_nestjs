import { ApiProperty } from '@nestjs/swagger';
import { product } from '../entity/product.entity';
import { category } from '../entity/category.entity';

export class prodtypeResponseDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name?: string;
}
