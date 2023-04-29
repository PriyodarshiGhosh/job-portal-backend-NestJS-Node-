import { IJobModel } from '@app/Job/interfaces/jobs';
import { Transformer } from '@libs/boat';
export class JobPostingDetailTransformer extends Transformer {
  async transform(jobs:IJobModel): Promise<any> {
    const transformedJobs: IJobModel[] = [];
      console.log(jobs)
      transformedJobs.push({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        location: jobs.location,
        salary: jobs.salary,
      });
  
   //console.log(transformedJobs)
    return transformedJobs;
  }
}//this.collection