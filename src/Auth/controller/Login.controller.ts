import { Controller, Post, Body, Req ,UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { Request } from '@libs/boat';
import { LoginDto } from '../DTO/loginDTO';
import { ConflictException } from '@nestjs/common';
import { LoginService } from '../services/login.services';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../Guards/roles.guard';
import { Roles } from '../../Guards/roles.decorator';
@Controller('auth/login')
export class LoginController {
  constructor(private readonly authService: LoginService,
    private readonly jwtService: JwtService
    ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('recruiter','candidate','admin')
  async create(@Req() req:Request) {
    const inputs=req.all();
    return this.authService.login(inputs);
    
    }
}

