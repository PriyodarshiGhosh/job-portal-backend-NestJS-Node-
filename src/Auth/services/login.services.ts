import { UserModel, UserService } from '@app/user';
import { IUserModel } from '@app/user/interfaces/user';
import { GenericException } from '@libs/boat';
import { BaseValidator } from '@libs/boat/validator';
import { Injectable } from '@nestjs/common';
import { LoginDto } from '../DTO/loginDTO';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
 @Injectable()
 export class LoginService {
     constructor(
         private readonly userService: UserService,
         private validator: BaseValidator,
         private jwtService: JwtService
       ) {}
      async findByEmailAndPassword(inputs: Record<string,any>): Promise<IUserModel[]> {
        const validatedInputs = await this.validator.fire(inputs,LoginDto)
        const user = await this.userService.userRepo.getWhere({email: validatedInputs.email,password:validatedInputs.password},true);
        const dataUser=await this.userService.userRepo.all();
        console.log(dataUser)
        console.log(user)
        return user??null;
      }
      async login(inputs: Record<string,any>) {
        const validatedInputs = await this.validator.fire(inputs,LoginDto)
        const user = await this.userService.userRepo.getWhere({email: validatedInputs.email,password:validatedInputs.password,is_active:true},true);
        const payload = { id:user[0].id ,email: validatedInputs.email};
        
        return {
           accessToken :this.jwtService.sign(payload,{secret:jwtConstants.secret}),
           role:user[0].role
        };
    }
    }