import { usersStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  getAllUser: jest.fn().mockResolvedValue(usersStub()),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  getUserInfoandOrders: jest.fn(),
  getOrders: jest.fn(),
});
