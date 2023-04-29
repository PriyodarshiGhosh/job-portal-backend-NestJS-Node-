import { Controller, Delete, UseGuards } from "@nestjs/common";
import { JobService } from "@app/Job/services/recruiter.services";
import { UserService } from "@app/user";
import { CandidateService } from "@app/Application/services/candidate.services";
import { Get } from "@nestjs/common";
import { Headers } from "@nestjs/common";
import { GenericException } from "@libs/boat";
import * as jwt from 'jsonwebtoken';
import { Req } from "@nestjs/common";
import { Request } from "@libs/boat";
import { AdminService } from "../services/admin.services";
import { JwtAuthGuard } from "../../Guards/jwt.admin.guard";
@Controller('admin')
export class AdminController{
    constructor(private readonly jobService:JobService,
        private readonly userService:UserService,
        private readonly candidateService:CandidateService,
        private readonly adminService:AdminService) {}
        @Get('applicants')
        @UseGuards(JwtAuthGuard)
        async fetchApplicant(){
          return this.adminService.fetchApplicant();
        }
        @Get('recruiter')
        @UseGuards(JwtAuthGuard)
        async fetchRecruiter(){
          return this.adminService.fetchRecruiter();
        }
        @Delete('candidate')
        @UseGuards(JwtAuthGuard)
        async removeCandidate(@Req() req:Request){
            const inputs=req.all();
          return this.adminService.removeApplicant(inputs);
        }
        @Delete('recruiter')
        @UseGuards(JwtAuthGuard)
        async removeRecruiter(@Req() req:Request){
          const inputs=req.all();
          return this.adminService.removeRecruiter(inputs);

        }
}