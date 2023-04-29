import { IJobModel } from '@app/Job/interfaces/jobs';
import { RepositoryContract } from '@libs/database';
import { IApplicationModel } from '@app/Application/interfaces/candidate';

export interface ApplicationRepositoryContract extends RepositoryContract<IApplicationModel> {
    //
}