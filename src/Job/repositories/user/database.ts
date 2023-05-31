import { JobModel } from '@app/Job/models/jobs';
import { Injectable } from '@nestjs/common';
import { JobRepositoryContract } from './contract';
import { DatabaseRepository, InjectModel } from '@libs/database';
import { IJobModel, IJobSearchModel } from '@app/Job/interfaces/jobs';
import { Pagination } from '@libs/boat';
@Injectable()
export class JobRepository
  extends DatabaseRepository<IJobModel>
  implements JobRepositoryContract
{
  @InjectModel(JobModel)
  model: JobModel;
  
  async search(inputs: IJobSearchModel): Promise<Pagination<IJobModel>> {
    const query = this.query();
  
    if (inputs.search) {
      query.where('title', 'like', `%${inputs.search}%`);
    }
  
    if (inputs.recruiterId) {
      query.where('recruiterId', 'like', `%${inputs.recruiterId}%`);
    }
  
    const page = Number(inputs.currentPage) || 1; // Use the currentPage query parameter
    const perPage = inputs.perPage || 8;
  
    const searchResult: Pagination<IJobModel> = await query.paginate(page, perPage);
    return searchResult;
  }}
