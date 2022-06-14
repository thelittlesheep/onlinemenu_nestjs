import {
  userCreateSuccessStub,
  userListStub,
  userStub,
  userUpdateItemsStub,
} from '../test/stubs/user.stub';

// userService.ts當中共有5個function，分別是：
// 1. findUserByAccount(user_account: string)
// 2. findUserByID(user_id: number)
// 3. getAllUser()
// 4. createUser(data: userDTO)
// 5. updateUser(user_id: number, newUser: userInfoDTO, session: ISession<userInfoDTO>)
// 其中在userController.ts當中使用到的function有：
// 3. getAllUser()
// 4. createUser(data: userDTO)
// 5. updateUser(user_id: number, newUser: userInfoDTO, session: ISession<userInfoDTO>)
// 僅需要對此3個function做mock，就可以測試userController.ts中的所有function，而不需要測試userService.ts中的所有function。

// 所有的成功 Response都應該為下面之格式：
// {
//   statusCode: 200,
//   status: 'success',
//   message: '',
//   data: {}

export const UserService = jest.fn().mockReturnValue({
  getAllUser: jest.fn().mockResolvedValue(userListStub()),
  createUser: jest.fn().mockResolvedValue({ user_id: userStub().user_id }),
  updateUser: jest.fn().mockResolvedValue(userUpdateItemsStub()),
});
