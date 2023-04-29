import { Module} from "@nestjs/common";
import { JobController } from "./controllers/recruiter.controller";
import { JobModuleConstants } from "./constants";
import { JobRepository } from "./repositories/user/database";
import { JobService } from "./services/recruiter.services";
import { BoatModule } from "@libs/boat";
import { UserService } from "@app/user";
import { UserModule } from "@app/user";
import { CandidateService } from "@app/Application/services/candidate.services";
import { ApplicationModuleConstants } from "@app/Application/constants";
import { ApplicationRepository } from "@app/Application/repositories/user/database";
import { CandidateModule } from "@app/Application/candidate.module";
import { forwardRef } from "@nestjs/common";
@Module({
  imports: [BoatModule,UserModule,forwardRef(() => CandidateModule)],
  controllers: [JobController],
  providers: [
    JobService,
    { provide: JobModuleConstants.jobRepo,useClass: JobRepository },
    CandidateService,
    { provide: ApplicationModuleConstants.applicationRepo,useClass:ApplicationRepository }
],
  exports:[JobService]
})
export class JobModule {}