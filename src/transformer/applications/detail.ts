import { IApplicationModel } from '@app/Application/interfaces/candidate';
import { IJobModel } from '@app/Job/interfaces/jobs';
import { Transformer } from '@libs/boat';

export class JobDetailTransformer extends Transformer {
  async transform(applications: IApplicationModel[]): Promise<IApplicationModel[]> {
    const transformedJobs: IApplicationModel[] = [];
    //console.log(applications)
    for (let i=0;i<applications.length;i++) {
      transformedJobs.push({
        id: applications[i].id,
        resume: applications[i].resume
      });
    }
    //console.log(transformedJobs)
    return transformedJobs;
  }
}