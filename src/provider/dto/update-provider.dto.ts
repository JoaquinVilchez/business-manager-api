import { PartialType } from '@nestjs/swagger';
import { CreateProviderDto } from './create-provider.dto';
import {
  ValidateIf,
  IsString,
  IsEmail,
  IsNumber,
  Matches,
  MinLength,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {
  @ApiProperty({
    description: 'Company name',
    example: 'Acme Corp',
    minLength: 2,
    maxLength: 100,
    required: false,
  })
  @ValidateIf((o: UpdateProviderDto) => o.companyName !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  companyName?: string;

  @ApiProperty({
    description: 'Company tax ID (CUIT)',
    example: '30-12345678-9',
    minLength: 11,
    maxLength: 13,
    required: false,
  })
  @ValidateIf((o: UpdateProviderDto) => o.cuit !== undefined)
  @IsString()
  @Matches(/^[0-9]{2}-[0-9]{8}-[0-9]{1}$/, {
    message: 'CUIT must be in the format XX-XXXXXXXX-X',
  })
  cuit?: string;

  @ApiProperty({
    description: 'Responsible person name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
    required: false,
  })
  @ValidateIf((o: UpdateProviderDto) => o.responsable !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  responsable?: string;

  @ApiProperty({
    description: 'Contact email',
    example: 'contact@acmecorp.com',
    required: false,
  })
  @ValidateIf((o: UpdateProviderDto) => o.email !== undefined)
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+5491123456789',
    required: false,
  })
  @ValidateIf((o: UpdateProviderDto) => o.phone !== undefined)
  @IsString()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    description: 'Bank account number (CBU)',
    example: '1234567890123456789012',
    required: false,
    minLength: 22,
    maxLength: 22,
  })
  @ValidateIf((o: UpdateProviderDto) => o.cbu !== undefined)
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
  @ValidateIf((o: UpdateProviderDto) => o.alias !== undefined)
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
  @ValidateIf((o: UpdateProviderDto) => o.addressId !== undefined)
  @IsNumber()
  addressId?: number;

  @ApiProperty({
    description: 'Invoice type ID',
    required: false,
    minimum: 1,
  })
  @ValidateIf((o: UpdateProviderDto) => o.invoiceTypeId !== undefined)
  @IsNumber()
  invoiceTypeId?: number;

  @ApiProperty({
    description: 'Category ID',
    required: false,
    minimum: 1,
  })
  @ValidateIf((o: UpdateProviderDto) => o.categoryId !== undefined)
  @IsNumber()
  categoryId?: number;

  @ApiProperty({
    description: 'Additional comments',
    required: false,
    maxLength: 500,
  })
  @ValidateIf((o: UpdateProviderDto) => o.comment !== undefined)
  @IsString()
  @MaxLength(500)
  comment?: string;
}
