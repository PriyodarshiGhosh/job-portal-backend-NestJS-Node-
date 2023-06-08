import { Controller, Query, UseGuards } from "@nestjs/common";
import { UserService } from "@app/user";
import { JobService } from "@app/Job/services/recruiter.services";
import { CandidateService } from "../services/candidate.services";
import { Headers } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { GenericException, Pagination, RestController } from "@libs/boat";
import { Get ,Post} from "@nestjs/common";
import { Req } from "@nestjs/common";
import { Request } from "@libs/boat";
import { JwtAuthGuard } from "../../Guards/jwt.candidate.guard";
import { ApplicationDetailTransformer } from "../../transformer/recruiter/detail";
import { IJobModel, IJobSearchModel } from "@app/Job/interfaces/jobs";
import { JobDetailTransformer } from "@app/transformer/applications/detail";
import { ApplicationRepositoryContract } from "../repositories/user/contract";
@Controller('user/jobs')
//jobs/application
export class CandidateController extends RestController{
    constructor(private readonly jobService:JobService,
        private readonly userService:UserService,
        private readonly candidateService:CandidateService) {
          super();
        }
        @Get()
        @UseGuards(JwtAuthGuard)
        async fetch(@Req() req:Request){
          const inputs = req.all();
          const result= await this.candidateService.fetch(inputs as IJobSearchModel);
          console.log(result)
          return result;
          //return await this.transform(result, new ApplicationDetailTransformer(),{req})
      }
//add return type everywhere
//remove unused vars
//plural or singular naming conventions
      @Get('/application')
      @UseGuards(JwtAuthGuard)
      async fetchApplications(@Req() req:Request):Promise<any>{ 
            const userId=req.user.id;
            console.log(userId)
            const result= await this.candidateService.fetchApplication(userId);
            console.log(result)
            return result;
            //return await this.transform(result, new JobDetailTransformer(),{req})
      }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req:Request) {
    const inputs = req.all();
    const userId = req.user.id;
    const result=await this.candidateService.create(inputs,userId);
    return result;
    //return await this.transform(result, new JobDetailTransformer(),{req})
    //transformer
  }
  
}