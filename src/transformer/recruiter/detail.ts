import { IJobModel } from '@app/Job/interfaces/jobs';
import { Pagination, Transformer } from '@libs/boat';

export class ApplicationDetailTransformer extends Transformer {
  async transform(jobs: Pagination<IJobModel>): Promise<IJobModel[]> {
    const transformedJobs: IJobModel[] = [];
   console.log(jobs)
    for (let i=0;i<jobs.data.length;i++) {
      const job=jobs.data[i];
      transformedJobs.push({
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
      });
    }
   //console.log(transformedJobs)
    return transformedJobs;
  }
}//this.collection