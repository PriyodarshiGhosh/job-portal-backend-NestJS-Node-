import { Module} from "@nestjs/common";
import { BoatModule } from "@libs/boat";
import { UserModule } from "@app/user";
import { ApplicationModuleConstants } from "./constants";
import { ApplicationRepository } from "./repositories/user/database";
import { CandidateController } from "./controllers/candidate.controller";
import { CandidateService } from "./services/candidate.services";
import { JobModule } from "@app/Job/job.module";
import { JobService } from "@app/Job/services/recruiter.services";
import { JobModuleConstants } from "@app/Job/constants";
import { JobRepository } from "@app/Job/repositories/user/database";
import { forwardRef } from "@nestjs/common";
import { ApplicationDetailTransformer } from "../transformer/recruiter/detail";
@Module({
  imports: [BoatModule,UserModule,forwardRef(() => JobModule)],
  controllers: [CandidateController],
  providers: [
    CandidateService,
    { provide: ApplicationModuleConstants.applicationRepo,useClass:ApplicationRepository },
    JobService,
    { provide: JobModuleConstants.jobRepo,useClass: JobRepository }
],
  exports:[CandidateService]
})
export class CandidateModule {}