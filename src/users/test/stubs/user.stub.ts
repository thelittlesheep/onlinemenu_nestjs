import { user } from '@/users/user.entity';

export const userStub = (): user => {
  return {
    user_id: 1,
    user_name: 'HankHuang',
    user_email: 'hank@gmail.com',
    user_phone: '0923313333',
    user_age: 22,
    user_role: 'customer',
  };
};

export const usersStub = (): user[] => {
  return [
    {
      user_id: 1,
      user_name: 'HankHuang',
      user_email: 'hank@gmail.com',
      user_phone: '0923313333',
      user_age: 22,
      user_role: 'customer',
    },
  ];
};
