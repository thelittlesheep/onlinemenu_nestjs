import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../user.entity';
import { UserService } from '../user.service';
import { updateResultStub } from './stubs/repository.stub';
import { userListStub, userStub } from './stubs/user.stub';

describe('UserService', () => {
  let userService: UserService;
  let userRespository: Repository<user>;

  const mockUserRepository = {
    // findOne: jest.fn().mockImplementation((user_id: number) => {
    //   if (user_id === userStub().user_id) return Promise.resolve(userStub());
    //   // return Promise.reject(null);
    // }),
    findOne: jest.fn().mockResolvedValue(userStub()),
    find: jest.fn().mockResolvedValue(userListStub()),
    save: jest.fn().mockResolvedValue(userStub()),
    update: jest.fn().mockResolvedValue(updateResultStub()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(user, 'onlinemenu'),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRespository = module.get(getRepositoryToken(user, 'onlinemenu'));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findUserByAccount', () => {
    describe('when findUserByAccount is called', () => {
      let user: user;
      beforeEach(async () => {
        user = await userRespository.findOne();
      });

      it('should call userRespository', () => {
        expect(userRespository.findOne).toHaveBeenCalled();
      });

      it('should return All users in database', () => {
        expect(user).toEqual(userStub());
      });

      it('should return specific user', async () => {
        expect(await userService.findUserByAccount(user.user_account)).toEqual(
          userStub(),
        );
      });

      it("should return error when user isn't found", async () => {
        jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(undefined);
        expect(await userService.findUserByAccount(user.user_account)).toEqual(
          undefined,
        );
      });
    });
  });

  // describe('findUserByID', () => {
  //   describe('when findUserByID is called', () => {
  //     let user: user;
  //     beforeEach(async () => {
  //       user = await userRespository.findOne();
  //     });

  //     it('should call userRespository', () => {
  //       expect(userRespository.findOne).toHaveBeenCalled();
  //     });

  //     it('should return All users in database', () => {
  //       expect(user).toEqual(userStub());
  //     });

  //     it('should return specific user', async () => {
  //       expect(await userService.findUserByID(1)).toEqual(userStub());
  //     });
  //   });
  // });
});
