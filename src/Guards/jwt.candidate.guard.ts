import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '@app/user';
import { GenericException } from '@libs/boat';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;

    if (!bearerToken) {
      throw new UnauthorizedException('Missing JWT token');
    }

    const accessToken = bearerToken.split(' ')[1];
    const secretKey = 'hiii';

    try {
      // verify and decode JWT access token
      const decodedToken = jwt.verify(accessToken, secretKey) as any;
      const userId = decodedToken.id;
      const user = await this.userService.userRepo.getWhere({ id: userId });

      if (!user) {
        throw new GenericException();
      }

      if (user[0].role === 'candidate') {
        request.user = { id: userId };
        return true;
      }

      return false;
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}

