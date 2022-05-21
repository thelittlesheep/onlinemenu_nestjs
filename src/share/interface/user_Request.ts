import { user } from 'users/user.entity';

export interface Iuser_Request<T> extends Request {
  user: user;
  params: T;
}
