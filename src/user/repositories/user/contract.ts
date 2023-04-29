import { IUserModel } from '@app/user/interfaces/user';
import { RepositoryContract } from '@libs/database';

export interface UserRepositoryContract extends RepositoryContract<IUserModel> {}
