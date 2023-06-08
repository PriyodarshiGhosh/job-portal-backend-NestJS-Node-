import { Injectable, UnauthorizedException } from "@nestjs/common";
import { BaseValidator } from "@libs/boat/validator";
import { ApplicationModuleConstants } from "../constants";
import { ApplicationRepositoryContract } from "../repositories/user/contract";
import { Inject } from "@nestjs/common";
import { JobRepositoryContract } from "@app/Job/repositories/user/contract";
import { JobModuleConstants } from "@app/Job/constants";
import { IApplicationModel } from "../interfaces/candidate";
import { GenericException, Pagination, RestController } from "@libs/boat";
import { IJobModel, IJobSearchModel } from "@app/Job/interfaces/jobs";
import { UserService } from "@app/user";

@Injectable()
export class CandidateService{
    constructor(
        private validator: BaseValidator,
        private readonly userService: UserService,
        @Inject(ApplicationModuleConstants.applicationRepo) public applicationRepo: ApplicationRepositoryContract,
        @Inject(JobModuleConstants.jobRepo) public jobRepo: JobRepositoryContract
      ) {}
      async fetch(inputs: IJobSearchModel):Promise<any>{
        return await this.jobRepo.search(inputs);
    }
    async fetchApplication(id:number):Promise<IApplicationModel[]>{
      const applicants=this.applicationRepo.getWhere({userId:id})
           const users = [];
           console.log(applicants)
            for (const applicant of await applicants) {
             const user = await this.jobRepo.getWhere({ id: applicant.jobId });
              if (user) {
                users.push(user);
               }
       }
       console.log(users)
       return users;
      //return await this.applicationRepo.getWhere({userId:id});
  }
    async create(inputs: Record<string,any>,id:number): Promise<any> {
      //jobId
        const job=await this.jobRepo.getWhere({id:inputs.jobId})
        let count=0;
        if(!job) return GenericException;
        try{
          const check=await this.applicationRepo.getWhere({userId:id,jobId:inputs.jobId});
          console.log(check.length)
          if((check.length>0)){
            count=count+1;
            throw new GenericException('Already applied');
          }
        }
        
        catch(error){
          if(count===0){
            const user = await this.applicationRepo.create({
              userId:id,
              resume: inputs.resume,
              jobId:inputs.jobId// jobId
            });
             return user
          }
          else{
            throw new GenericException('Already applied');
          }
          
        }
        
        } 
}