import { JobModel } from '@app/Job/models/jobs';
import { Injectable } from '@nestjs/common';
import { ApplicationRepositoryContract} from './contract';
import { DatabaseRepository, InjectModel } from '@libs/database';
import { IApplicationModel } from '@app/Application/interfaces/candidate';
import { ApplicationModel } from '@app/Application/models/candidate';
@Injectable()
export class ApplicationRepository
  extends DatabaseRepository<IApplicationModel>
  implements ApplicationRepositoryContract
{
  @InjectModel(ApplicationModel)
  model: ApplicationModel;
  //search
}