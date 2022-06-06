import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { product } from 'menu/entity/product.entity';
import { user } from 'users/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
// subject指的是對哪個對象進行權限檢查，需在controller的@CheckAbilities()裡面指定
export type Subjects =
  | InferSubjects<typeof user | typeof product>
  | 'users'
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(attruser: user) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    console.log(attruser.user_role);

    if (attruser.user_role === 'admin') {
      // 這樣的權限指的是Admin只能對subject為user的endpoint進行權限控管
      // can(Action.Manage, user);
      // 這樣的權限指的是Admin能對subject為任何的endpoint進行權限控管
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Manage, 'all').because('You are not admin');
      // cannot(Action.Create, product).because(`You are not admin`);
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
