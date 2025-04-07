import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  ValidateIf,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'User first name',
    required: false,
    example: 'John',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  @ValidateIf((o: UpdateUserDto) => o.firstName !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    required: false,
    example: 'Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  @ValidateIf((o: UpdateUserDto) => o.lastName !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName?: string;

  @ApiProperty({
    description: 'User email address',
    required: false,
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @ValidateIf((o: UpdateUserDto) => o.email !== undefined)
  email?: string;

  @ApiProperty({
    description: 'User password',
    required: false,
    example: 'Password123!',
    minLength: 8,
    maxLength: 20,
  })
  @IsOptional()
  @ValidateIf((o: UpdateUserDto) => o.password !== undefined)
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
  })
  password?: string;
}
