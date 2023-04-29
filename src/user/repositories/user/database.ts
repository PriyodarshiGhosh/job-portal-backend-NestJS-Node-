import { UserModel } from '../../models';
import { Injectable } from '@nestjs/common';
import { UserRepositoryContract } from './contract';
import { DatabaseRepository, InjectModel } from '@libs/database';
import { IUserModel } from '@app/user/interfaces/user';

@Injectable()
export class UserRepository
  extends DatabaseRepository<IUserModel>
  implements UserRepositoryContract
{
  @InjectModel(UserModel)
  model: UserModel;
}
