import { updateResultStub } from '../test/stubs/repository.stub';
import { userListStub, userStub } from '../test/stubs/user.stub';

export const userRespository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(userListStub()),
  find: jest.fn().mockResolvedValue(userStub()),
  save: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(updateResultStub()),
});
