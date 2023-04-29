import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 20)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsIn(['admin','recruiter','candidate'])
  role: string;
}
