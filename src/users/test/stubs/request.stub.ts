import { userStub } from './user.stub';

export const requestStub = () => {
  return {
    user: userStub(),
    session: {
      cookie: {
        path: '/',
        _expires: {},
        originalMaxAge: 3600000,
        httpOnly: false,
        domain: 'localhost',
      },
      passport: {
        user: {
          user_id: 1,
          user_name: 'HankHuang',
          user_email: 'hank@gmail.com',
          user_phone: '0923313333',
          user_age: 22,
          user_role: 'customer',
        },
      },
      destroy: () => {
        requestStub().session = undefined;
      },
    },
  } as any;
};
