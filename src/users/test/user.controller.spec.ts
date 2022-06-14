import { OrderService } from '@/menu/service/order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { AbilityGuard } from '@/ability/ability.guard';
import * as httpMocks from 'node-mocks-http';
import { CanActivate } from '@nestjs/common';
import {
  userStub,
  userCreateSuccessStub,
  userDTOStub,
  userGetAllSuccessStub,
  userUpdateItemsStub,
  userUpdateSuccessStub,
} from './stubs/user.stub';
import { user } from '../user.entity';
import { TransformInterceptor } from '@/share/response.interceptor';
import { IResponseSuccess, ResponseSuccess } from '@/share/response.interface';
import { userListStub } from './stubs/user.stub';
import { requestStub } from './stubs/request.stub';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  class mockTransformInterceptor {
    intercept(
      statusCode: number,
      message: string,
      data: any,
    ): IResponseSuccess<any> {
      return new ResponseSuccess(statusCode, message, data);
    }
  }
  const mockOrderService = {};
  const mockAbilityGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, OrderService, TransformInterceptor],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .overrideGuard(AbilityGuard)
      .useValue(mockAbilityGuard)
      .compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('login', () => {
    describe('when login is called', () => {
      let user_id;
      beforeEach(async () => {
        user_id = requestStub().user.user_id;
      });

      it('should return "成功登入" and user_id object', () => {
        expect(userController.login(requestStub())).toEqual(
          ResponseSuccess.responseGenerator('成功登入', {
            user_id: user_id,
          }),
        );
      });
    });
  });

  describe('logout', () => {
    describe('when logout is called', () => {
      let session;
      beforeEach(async () => {
        session = requestStub().session;
      });

      it('session should exist', () => {
        expect(session).toBeDefined();
      });

      it('should return "成功登出"', () => {
        expect(userController.logout(requestStub())).toEqual(
          ResponseSuccess.responseGenerator('成功登出', null),
        );
      });
    });
  });

  describe('getAllUser', () => {
    describe('when getAllUser is called', () => {
      let userList: user[];
      beforeEach(async () => {
        userList = await userService.getAllUser();
      });

      it('it should call userService', () => {
        expect(userService.getAllUser).toHaveBeenCalledWith();
      });

      it('should return All users in database', () => {
        expect(userList).toEqual(userListStub());
      });

      it('it should return value as IResponseSuccess after interceptor process', async () => {
        const inteceptor = new mockTransformInterceptor();
        expect(
          inteceptor.intercept(200, '成功取得所有使用者資料', userList),
        ).toEqual(userGetAllSuccessStub());
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let responseDataBeforeInterceptor: { user_id: number };
      beforeEach(async () => {
        responseDataBeforeInterceptor = await userService.createUser(
          userDTOStub(),
        );
      });

      it('it should call userService', () => {
        expect(userService.createUser).toHaveBeenCalledWith(userDTOStub());
      });

      it('it should return user_id object', () => {
        expect(responseDataBeforeInterceptor).toEqual({
          user_id: userStub().user_id,
        });
      });

      it('it should return value as IResponseSuccess after interceptor process', async () => {
        const interceptor = new mockTransformInterceptor();
        expect(
          interceptor.intercept(
            201,
            '成功新增使用者',
            responseDataBeforeInterceptor,
          ),
        ).toEqual(userCreateSuccessStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let responseDataBeforeInterceptor: string[];
      let user: user;
      let session;
      beforeEach(async () => {
        user = userStub();
        responseDataBeforeInterceptor = await userService.updateUser(
          user.user_id,
          userDTOStub(),
          session,
        );
      });

      it('it should call userService', () => {
        expect(userService.updateUser).toHaveBeenCalledWith(
          user.user_id,
          userDTOStub(),
          session,
        );
      });

      it('it should return Array of updateItems', () => {
        expect(responseDataBeforeInterceptor).toEqual(userUpdateItemsStub());
      });

      it('it should return value as IResponseSuccess after interceptor process', async () => {
        const interceptor = new mockTransformInterceptor();
        expect(
          interceptor.intercept(
            200,
            '成功修改使用者資料',
            responseDataBeforeInterceptor,
          ),
        ).toEqual(userUpdateSuccessStub());
      });
    });
  });
});
