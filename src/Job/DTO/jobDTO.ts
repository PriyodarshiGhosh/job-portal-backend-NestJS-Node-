import { IsNotEmpty, IsString, Length } from "class-validator";

export class jobDTO{
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @Length(6, 20)
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    salary: string;
   
}