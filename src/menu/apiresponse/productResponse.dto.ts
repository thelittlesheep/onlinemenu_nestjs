import { ApiProperty } from '@nestjs/swagger';
import { category } from '../entity/category.entity';
import { product } from '../entity/product.entity';
import { prodtypeResponseDto } from './prodtypeResponse.dto';
export class productResponseDto extends product {
  @ApiProperty({ default: '1' })
  id?: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  type_id?: number;
  @ApiProperty()
  price?: number;
  @ApiProperty({ type: prodtypeResponseDto })
  prodtypes?: category;
}
