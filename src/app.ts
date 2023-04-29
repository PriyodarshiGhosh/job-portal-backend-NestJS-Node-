import { Module } from '@nestjs/common';
import { EventModule } from '@squareboat/nest-events';
import { UserModule } from './user';
import { BoatModule } from '@libs/boat';
import { ConsoleModule } from '@squareboat/nest-console';
import { ObjectionModule } from '@libs/database';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalizationModule } from '@squareboat/nestjs-localization';
import database from "@config/database";
import { AuthModule } from './Auth/Auth.module';
import { JobModule } from './Job/job.module';
import { CandidateModule } from './Application/candidate.module';
import { AdminModule } from './Admin/admin.module';
@Module({
  imports: [
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    // LocalizationModule.register({
    //   path: 'resources/lang',
    //   fallbackLang: 'en',
    // }),
    BoatModule,
    UserModule,
    EventModule,
    ConsoleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [database],
    }),
    AuthModule,
    JobModule,
    CandidateModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
