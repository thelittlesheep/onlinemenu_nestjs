import { IResponseSuccess } from '@/share/response.interface';
import { userDTO } from '@/users/DTO/user.DTO';
import { user } from '@/users/user.entity';

export const userStub = (): user => {
  return {
    user_id: 1,
    user_account: 'xiaoyang',
    user_password: 'X123456789',
    user_name: 'HankHuang',
    user_email: 'hank@gmail.com',
    user_phone: '0923313333',
    user_age: 22,
    user_role: 'customer',
  };
};

export const userDTOStub = (): userDTO => {
  return {
    user_account: 'xiaoyang',
    user_password: 'X123456789',
    user_name: 'HankHuang',
    user_email: 'hank@gmail.com',
    user_phone: '0923313333',
    user_age: 22,
  };
};

export const userListStub = (): user[] => {
  return [
    {
      user_id: 1,
      user_account: 'xiaoyang',
      user_password: 'X123456789',
      user_name: 'HankHuang',
      user_email: 'hank@gmail.com',
      user_phone: '0923313333',
      user_age: 22,
      user_role: 'customer',
    },
  ];
};

export const userUpdateItemsStub = (): string[] => {
  return ['user_name', 'user_phone'];
};

export const userGetAllSuccessStub = (): IResponseSuccess<any> => {
  return {
    statusCode: 200,
    isSuccess: true,
    message: '成功取得所有使用者資料',
    data: userListStub(),
  };
};

export const userCreateSuccessStub = (): IResponseSuccess<any> => {
  return {
    statusCode: 201,
    isSuccess: true,
    message: '成功新增使用者',
    data: { user_id: userStub().user_id },
  };
};

export const userUpdateSuccessStub = (): IResponseSuccess<any> => {
  return {
    statusCode: 200,
    isSuccess: true,
    message: '成功修改使用者資料',
    data: userUpdateItemsStub(),
  };
};
