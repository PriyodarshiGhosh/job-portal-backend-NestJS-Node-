import { Injectable } from "@nestjs/common";
import { BaseValidator } from "@libs/boat/validator";
import { UserService } from "@app/user";
import { IUserModel } from "@app/user/interfaces/user";
@Injectable()
export class AdminService{
    constructor(
        private validator: BaseValidator,
        private readonly userService: UserService
      ) {}
      async fetchApplicant():Promise<IUserModel[]>{
        const applicants=await this.userService.userRepo.getWhere({role:"candidate",is_active:true});
        return applicants;
    }
    async fetchRecruiter():Promise<IUserModel[]>{
        const applicants=await this.userService.userRepo.getWhere({role:"recruiter",is_active:true});
        return applicants;
    }
    async removeApplicant(inputs: Record<string,any>):Promise<IUserModel[]>{
        await this.userService.userRepo.update({id:inputs.id,role:"candidate"},{is_active:false});
        const user=await this.userService.userRepo.getWhere({id:inputs.id});
        return user;
    }
    async removeRecruiter(inputs: Record<string,any>):Promise<IUserModel[]>{
        await this.userService.userRepo.update({id:inputs.id,role:"recruiter"},{is_active:false});
        const user=await this.userService.userRepo.getWhere({id:inputs.id});
        return user;
    }
}