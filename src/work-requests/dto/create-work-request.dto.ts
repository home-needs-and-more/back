import { IsEmail, IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class CreateWorkRequestDto {
  @IsNotEmpty()
  @IsNumber()
  jobId: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  phoneNumber: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipCode: number;
}
