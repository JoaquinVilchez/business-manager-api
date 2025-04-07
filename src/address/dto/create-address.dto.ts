import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Street name',
    example: 'Main Street',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  street: string;

  @ApiProperty({
    description: 'Street number',
    example: '123',
    minLength: 1,
    maxLength: 10,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  number: string;

  @ApiProperty({
    description: 'Apartment or floor information',
    example: 'Apt 4B',
    required: false,
    minLength: 2,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  apartmentOrFloor?: string;

  @ApiProperty({
    description: 'City name',
    example: 'New York',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  city: string;

  @ApiProperty({
    description: 'State or province name',
    example: 'NY',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  state: string;

  @ApiProperty({
    description: 'ZIP or postal code',
    example: '10001',
    minLength: 3,
    maxLength: 10,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  zipCode: string;
}
