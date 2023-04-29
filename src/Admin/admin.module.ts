import { Module } from "@nestjs/common";
import { BoatModule } from "@libs/boat";
import { UserModule } from "@app/user";
import { CandidateController } from "@app/Application/controllers/candidate.controller";
import { JobController } from "@app/Job/controllers/recruiter.controller";
import { CandidateService } from "@app/Application/services/candidate.services";
import { JobService } from "@app/Job/services/recruiter.services";
import { ApplicationModuleConstants } from "@app/Application/constants";
import { ApplicationRepository } from "@app/Application/repositories/user/database";
import { JobModuleConstants } from "@app/Job/constants";
import { JobRepository } from "@app/Job/repositories/user/database";
import { AdminService } from "./services/admin.services";
import { AdminController } from "./controller/admin.controller";
@Module({
  imports: [BoatModule,UserModule],
  controllers: [CandidateController,JobController,AdminController],
  providers: [
    CandidateService,
    { provide: ApplicationModuleConstants.applicationRepo,useClass:ApplicationRepository },
    JobService,
    { provide: JobModuleConstants.jobRepo,useClass: JobRepository },
    AdminService
],
  exports:[AdminService]
})
export class AdminModule {}