import { OrderService } from '../menu/service/order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('AppController', () => {
  let userController: UserController;

  const mockUserService = {};
  const mockOrderService = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userController.logout('req')).toBe('Hello World!');
    });
  });
});
