import { Request } from '@libs/boat';
import { Controller, Post, Body, Req ,UsePipes, ValidationPipe} from '@nestjs/common';
import { RegisterDto } from '../DTO/authDTO';
import { AuthService } from '../services/Auth.services';

@Controller('auth/register')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Req() req:Request) {
    const inputs = req.all();
    return this.authService.create(inputs);
  }
  
}
// req: Request