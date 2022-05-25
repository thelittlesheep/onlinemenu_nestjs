import { ApiProperty } from '@nestjs/swagger';

enum crud_method {
  create = '新增',
  read = '查詢',
  update = '更新',
  delete = '刪除',
}

export class usersorders_GET_Apiparam_Schema {
  @ApiProperty({ description: `欲${crud_method.read}之使用者id` })
  user_id: number;
  @ApiProperty({ description: `欲${crud_method.read}之訂單id` })
  order_id: number;
}
export class usersorders_DELETE_Apiparam_Schema {
  @ApiProperty({ description: `欲${crud_method.delete}之使用者id` })
  user_id: number;
  @ApiProperty({ description: `欲${crud_method.delete}之訂單id` })
  order_id: number;
}
