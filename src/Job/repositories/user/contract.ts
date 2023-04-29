import { IJobModel, IJobSearchModel } from '@app/Job/interfaces/jobs';
import { Pagination } from '@libs/boat';
import { RepositoryContract } from '@libs/database';

export interface JobRepositoryContract extends RepositoryContract<IJobModel> {
      search(inputs: IJobSearchModel): Promise<Pagination<IJobModel>>;
      
}