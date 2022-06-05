import { Cookie, Session } from 'express-session';
import { Request } from 'express';

declare interface iRequest extends Request {
  cookie: Cookie;
  session: ISession;
}
export interface ISession<T = any> extends Session {
  passport: { user: T };
}
