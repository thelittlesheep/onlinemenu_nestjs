import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createproductDTO {
  @IsString()
  @ApiProperty()
  product_name?: string;
  @IsNumber()
  @ApiProperty()
  product_price?: number;
  @IsNumber()
  @ApiProperty()
  category_id?: number;
  @IsOptional()
  @IsString()
  @ApiProperty()
  product_image?: string;
}
export class updateproductDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  product_name?: string;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  product_price?: number;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  category_id?: number;
  @IsOptional()
  @IsString()
  @ApiProperty()
  product_image?: string;
}

export class getproductDTO extends createproductDTO {
  @IsNumber()
  @ApiProperty()
  product_id?: number;
}
