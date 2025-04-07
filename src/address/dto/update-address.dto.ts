import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { ValidateIf, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiProperty({
    description: 'Street name',
    example: 'Main Street',
    minLength: 2,
    maxLength: 100,
    required: false,
  })
  @ValidateIf((o: UpdateAddressDto) => o.street !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  street?: string;

  @ApiProperty({
    description: 'Street number',
    example: '123',
    minLength: 1,
    maxLength: 10,
    required: false,
  })
  @ValidateIf((o: UpdateAddressDto) => o.number !== undefined)
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  number?: string;

  @ApiProperty({
    description: 'Apartment or floor information',
    example: 'Apt 4B',
    required: false,
    minLength: 2,
    maxLength: 20,
  })
  @ValidateIf((o: UpdateAddressDto) => o.apartmentOrFloor !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  apartmentOrFloor?: string;

  @ApiProperty({
    description: 'City name',
    example: 'New York',
    minLength: 2,
    maxLength: 50,
    required: false,
  })
  @ValidateIf((o: UpdateAddressDto) => o.city !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  city?: string;

  @ApiProperty({
    description: 'State or province name',
    example: 'NY',
    minLength: 2,
    maxLength: 50,
    required: false,
  })
  @ValidateIf((o: UpdateAddressDto) => o.state !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  state?: string;

  @ApiProperty({
    description: 'ZIP or postal code',
    example: '10001',
    minLength: 3,
    maxLength: 10,
    required: false,
  })
  @ValidateIf((o: UpdateAddressDto) => o.zipCode !== undefined)
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  zipCode?: string;
}
