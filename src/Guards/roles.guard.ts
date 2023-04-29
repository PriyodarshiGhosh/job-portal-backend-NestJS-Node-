import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { LoginService } from "../Auth/services/login.services";
import { UserModel, UserService } from '@app/user';
import { BaseValidator } from '@libs/boat/validator';
import { IUserModel } from '@app/user/interfaces/user';
@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector,
        private readonly userService: UserService,
         private validator: BaseValidator
         ){}
    async canActivate(context:ExecutionContext):Promise<boolean>{
        const roles=this.reflector.get<string[]>('roles',context.getHandler());
        const request=context.switchToHttp().getRequest();
        //console.log(request.id)
       const user = await this.userService.userRepo.getWhere({email: request.body.email,password:request.body.password});
         console.log(user[0].id)
         console.log(user[0].role)
         console.log(roles.length)
         for(let i=0;i<roles.length;i++){
            if(user[0].role==roles[i])return true;
         }
        return false;
        //return this.matchRoles(roles, user.role);
    }

}