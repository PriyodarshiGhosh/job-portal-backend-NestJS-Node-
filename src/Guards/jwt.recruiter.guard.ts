import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '@app/user';
import { GenericException } from '@libs/boat';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly userService:UserService) {}

  async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    console.log(request)
    const bearerToken = request.headers.authorization;
    console.log(bearerToken)
    const accessToken = bearerToken.split(' ')[1];
      // verify and decode JWT access token
      const secretKey = 'hiii';
      const decodedToken = jwt.verify(accessToken, secretKey) as any;
      console.log(decodedToken.id)
      const userId = decodedToken.id;
    const user = await this.userService.userRepo.getWhere({id:userId});
    //{id, email, role,}
    request.user = user;
    console.log(user)
          if (!user) {
            throw new GenericException;
          }
          const queryUserId = request.query.recruiterId;
          console.log(queryUserId)
          console.log(userId)
          if (queryUserId && queryUserId == userId && user[0].role=="recruiter") {
                return true;
           }
           if(user[0].role=="recruiter"){
            request.user.id=userId
            return true;
           }
          return false;
    
  }
}