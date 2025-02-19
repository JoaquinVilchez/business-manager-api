import {
  IsEmail,
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Role } from '@prisma/client'; // Asegúrate de importar el enum Role de Prisma

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsEnum(Role)
  role: Role;
}
