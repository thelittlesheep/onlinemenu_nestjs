import { ApiProperty } from '@nestjs/swagger';

class crud_method_class {
  crud_method_string: string;
  description: string;
  constructor(crud_method_type: string, paramdescription: string) {
    enum crud_method {
      create = '新增',
      read = '查詢',
      update = '更新',
      delete = '刪除',
    }
    switch (crud_method_type) {
      case 'create':
        this.crud_method_string = crud_method.create;
        break;
      case 'read':
        this.crud_method_string = crud_method.read;
        break;
      case 'update':
        this.crud_method_string = crud_method.update;
        break;
      case 'delete':
        this.crud_method_string = crud_method.delete;
        break;
      default:
        this.crud_method_string = '';
        break;
    }
    this.description = `欲${this.crud_method_string}之${paramdescription}`;
  }
}

function crud_deco(crud_method_type: string, paramdescription: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function PropertyDecorator(target: Object, propertyKey: string): void {
    const crud_method_class_instance = new crud_method_class(
      crud_method_type,
      paramdescription,
    );
    const description = crud_method_class_instance.description;

    const api_property_options = {
      name: `${propertyKey}`,
      description: description,
    };
    ApiProperty(api_property_options)(target, propertyKey);
  };
}

export class usersorders_READ_Apiparam_Schema {
  @crud_deco('read', '訂單之使用者id')
  user_id: number;
  @crud_deco('read', '訂單id')
  order_id: number;
}
export class usersorders_DELETE_Apiparam_Schema {
  @crud_deco('delete', '訂單之使用者id')
  user_id: number;
  @crud_deco('delete', '訂單id')
  order_id: number;
}
