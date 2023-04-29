import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './services/login.services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: LoginService) {
    super();
  }

  async validate(inputs: Record<string,any>): Promise<any> {
    const user = await this.authService.findByEmailAndPassword(inputs);
    return user||null;
  }
}