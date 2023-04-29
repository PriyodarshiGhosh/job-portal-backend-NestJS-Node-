 import { UserModel, UserService } from '@app/user';
import { IUserModel } from '@app/user/interfaces/user';
import { BaseValidator } from '@libs/boat/validator';
 import { Injectable } from '@nestjs/common';
 import { registerAs } from '@nestjs/config';
import { RegisterDto } from '../DTO/authDTO';
import { LoginDto } from '../DTO/loginDTO';
 @Injectable()
 export class AuthService {
     constructor(
         private readonly userService: UserService,
         private validator: BaseValidator
       ) {}
      async findByEmailAndPassword(inputs: Record<string,any>): Promise<IUserModel[]> {
        const validatedInputs = await this.validator.fire(inputs,LoginDto)
        const user = await this.userService.userRepo.getWhere({email: validatedInputs.email,password:validatedInputs.password});
        return user;
      }
         
  async create(inputs: Record<string,any>): Promise<IUserModel> {
    
    const validatedInputs = await this.validator.fire(inputs,RegisterDto)
    console.log("🚀 ~ file: Auth.services.ts:16 ~ AuthService ~ create ~ validated:")
    //ctrl+option+L

    const user = await this.userService.userRepo.create({
      email: validatedInputs.email,
      password:validatedInputs.password,
      role:validatedInputs.role

    });
     return user
    }
 }
//  async create(inputs: ModelKeys<T>): Promise<T> {
//   return this.query().insert(inputs).returning('*') as unknown as T;
// }
// export type ModelKeys<T> = Partial<T> & {
//   [key: string]: any;
// };