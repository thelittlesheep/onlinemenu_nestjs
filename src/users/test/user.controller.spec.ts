import { OrderService } from '@/menu/service/order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { AbilityGuard } from '@/ability/ability.guard';
import * as httpMocks from 'node-mocks-http';
import { userDTO } from '../DTO/user.DTO';
import { Request } from 'express';
import { CanActivate } from '@nestjs/common';
import { userStub } from './stubs/user.stub';

describe('UserController', () => {
  let userController: UserController;
  const users = [
    { user_id: 1, user_name: 'test', user_role: 'admin' },
    { user_id: 2, user_name: 'test2', user_role: 'customer' },
  ];

  const mockUserService = {
    getAllUser: jest.fn(() => {
      return users;
    }),
  };
  const mockOrderService = {};
  const mockAbilityGuard: CanActivate = { canActivate: jest.fn(() => true) };
  // const req = httpMocks.createRequest({
  //   User: {
  //     user_id: 1,
  //   },
  //   session: {},
  // });
  const request = {
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
        request.session = undefined;
      },
    },
  } as any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, OrderService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .overrideGuard(AbilityGuard)
      .useValue(mockAbilityGuard)
      .compile();

    userController = app.get<UserController>(UserController);
  });

  describe('login', () => {
    it('should return "login success" and "req.user.user_id', () => {
      expect(userController.login(request)).toEqual({
        message: 'login success',
        user_id: request.user.user_id,
      });
    });
  });

  describe('logout', () => {
    it('should return "logout success"', () => {
      expect(userController.logout(request)).toEqual({
        message: 'logout success',
      });
    });
  });

  describe('getAllUser', () => {
    it('should return All users in database', () => {
      expect(userController.getAllUser(request)).toEqual(users);
    });
  });
});
