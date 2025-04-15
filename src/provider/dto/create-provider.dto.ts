import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  Matches,
  MinLength,
  MaxLength,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Acme Corp',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  companyName: string;

  @ApiProperty({
    description: 'Company tax ID (CUIT)',
    example: '30-12345678-9',
    minLength: 11,
    maxLength: 13,
  })
  @IsString()
  @Matches(/^[0-9]{2}-[0-9]{8}-[0-9]{1}$/, {
    message: 'CUIT must be in the format XX-XXXXXXXX-X',
  })
  cuit: string;

  @ApiProperty({
    description: 'Responsible person name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  responsable?: string;

  @ApiProperty({
    description: 'Contact email',
    example: 'contact@acmecorp.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+5491123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Bank account number (CBU)',
    example: '1234567890123456789012',
    required: false,
    minLength: 22,
    maxLength: 22,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{22}$/, { message: 'CBU must be a 22-digit number' })
  cbu?: string;

  @ApiProperty({
    description: 'Bank account alias',
    example: 'acme.corp',
    required: false,
    minLength: 6,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9._-]{6,20}$/, {
    message:
      'Alias must be 6-20 characters and can include letters, numbers, dots, hyphens, and underscores',
  })
  alias?: string;

  @ApiProperty({
    description: 'Address ID',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  addressId?: number;

  @ApiProperty({
    description: 'Invoice type ID',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  invoiceTypeId?: number;

  @ApiProperty({
    description: 'Category ID',
    required: true,
    minimum: 1,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'Array of payment method IDs',
    example: [1, 2, 3],
    type: [Number],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  paymentMethodIds: number[];

  @ApiProperty({
    description: 'Additional comments',
    required: false,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
}
