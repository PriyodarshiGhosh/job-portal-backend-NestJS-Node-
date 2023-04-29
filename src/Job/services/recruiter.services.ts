import { UserModel, UserService } from '@app/user';
import { JobModel } from '../models/jobs';
import { IJobModel, IJobSearchModel } from '../interfaces/jobs';
import { GenericException, Pagination } from '@libs/boat';
import { BaseValidator } from '@libs/boat/validator';
import { Injectable } from '@nestjs/common';
import { jobDTO } from '../DTO/jobDTO';
import { JobModuleConstants } from '../constants';
import { JobRepositoryContract } from '../repositories/user/contract';
import { Inject } from '@nestjs/common';
import { ApplicationModuleConstants} from '@app/Application/constants';
import { ApplicationRepositoryContract } from '@app/Application/repositories/user/contract';
import { IApplicationModel } from '@app/Application/interfaces/candidate';
 @Injectable()
 export class JobService {
     constructor(
         private validator: BaseValidator,
         @Inject(JobModuleConstants.jobRepo) public jobRepo: JobRepositoryContract,
         @Inject(ApplicationModuleConstants.applicationRepo) public applicationRepo:ApplicationRepositoryContract

       ) {}
       async fetchApplicants(id:number,inputs: Record<string,any>):Promise<any>{
        const jobPostings=await this.jobRepo.getWhere({recruiterId:id,id:inputs.id});
        if(!jobPostings) return GenericException;
        const applicants= await this.applicationRepo.getWhere({jobId:inputs.id})
        return applicants
    }

       async fetch(inputs:IJobSearchModel):Promise<Pagination<IJobModel>>{
           //const jobPostings=await this.jobRepo.getWhere({recruiterId:id});
           //return jobPostings;
           return await this.jobRepo.search(inputs); 
       }

       async create(inputs: Record<string,any>,id:number): Promise<IJobModel> {
        const validatedInputs = await this.validator.fire(inputs,jobDTO)
        console.log("🚀 ~ file: Auth.services.ts:16 ~ AuthService ~ create ~ validated:")
        const user = await this.jobRepo.create({
          recruiterId:id,
          title: validatedInputs.title,
          description:validatedInputs.description,
          location:validatedInputs.location,
          salary:validatedInputs.salary,
          is_active:true
        });
         return user
        }
      
    }