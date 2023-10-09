import { IsAlpha, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id: string;

  @IsAlpha()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
