import { ApiProperty } from '@nestjs/swagger';

export class prodtypeResponseDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name?: string;
}
