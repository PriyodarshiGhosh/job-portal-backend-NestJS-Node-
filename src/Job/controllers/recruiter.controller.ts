import { GenericException, Pagination, Request } from '@libs/boat';
import { Controller, Post, Body, Req ,UsePipes, ValidationPipe, Get, UseGuards, Query} from '@nestjs/common';
import { JobService } from '../services/recruiter.services';
import * as jwt from 'jsonwebtoken';
import { UserService } from '@app/user';
import { Headers } from '@nestjs/common';
import { JwtAuthGuard } from '../../Guards/jwt.recruiter.guard';
import { JobDetailTransformer } from '../../transformer/applications/detail';
import { RestController } from '@libs/boat';
import { IJobModel, IJobSearchModel } from '../interfaces/jobs';
import { ApplicationDetailTransformer } from '@app/transformer/recruiter/detail';
import { JobModel } from '../models/jobs';
import { JobPostingDetailTransformer } from '@app/transformer/recruiter/detail1';
@Controller('recruiter/jobs')
//TODO: add transformers everwhere
export class JobController extends RestController{
  constructor(private readonly jobService:JobService,
    private readonly userService:UserService) {
      super();
    }
  @Get()
  @UseGuards(JwtAuthGuard)
  async fetch(@Req() req:Request){
    const inputs=req.all();
    const jobs= this.jobService.fetch(inputs as IJobSearchModel);
    console.log(inputs)
    console.log(jobs)
    return jobs;
    //return await this.transform(jobs, new ApplicationDetailTransformer(),{req})
    
  }
  @Get('/id')
  @UseGuards(JwtAuthGuard)
  async fetchApplicants(@Req() req:Request){
    let user = req.user;
    const inputs=req.all();
    const userId = req.user.id;
    const result= await this.jobService.fetchApplicants(userId,inputs);
    //return result;
    return await this.transform(result, new JobDetailTransformer(),{req})
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req:Request) {
    const inputs = req.all();
    const userId = req.user.id;
    const jobs=await this.jobService.create(inputs,userId);
    return await this.transform(jobs, new JobPostingDetailTransformer(),{req})
  }
  
}
