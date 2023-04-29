import { Injectable } from "@nestjs/common";
import { BaseValidator } from "@libs/boat/validator";
import { ApplicationModuleConstants } from "../constants";
import { ApplicationRepositoryContract } from "../repositories/user/contract";
import { Inject } from "@nestjs/common";
import { JobRepositoryContract } from "@app/Job/repositories/user/contract";
import { JobModuleConstants } from "@app/Job/constants";
import { IApplicationModel } from "../interfaces/candidate";
import { GenericException, Pagination, RestController } from "@libs/boat";
import { IJobModel, IJobSearchModel } from "@app/Job/interfaces/jobs";

@Injectable()
export class CandidateService{
    constructor(
        private validator: BaseValidator,
        @Inject(ApplicationModuleConstants.applicationRepo) public applicationRepo: ApplicationRepositoryContract,
        @Inject(JobModuleConstants.jobRepo) public jobRepo: JobRepositoryContract
      ) {}
      async fetch(inputs: IJobSearchModel):Promise<any>{
        return await this.jobRepo.search(inputs);
    }
    async fetchApplication(id:number):Promise<IApplicationModel[]>{
      return await this.applicationRepo.getWhere({userId:id});
  }
    async create(inputs: Record<string,any>,id:number): Promise<any> {
      //jobId
        const job=await this.jobRepo.getWhere({id:inputs.jobId})
        if(!job) return GenericException;
        const user = await this.applicationRepo.create({
          userId:id,
          resume: inputs.resume,
          jobId:inputs.jobId// jobId
        });
         return user
        } 
}