import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  Matches,
} from 'class-validator';

export class CreateProviderDto {
  @IsString()
  companyName: string;

  @IsString()
  cuit: string;

  @IsString()
  responsable: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{22}$/, { message: 'CBU must be a 22-digit number' })
  cbu?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z0-9._-]{6,20}$/, {
    message:
      'Alias must be 6-20 characters and can include letters, numbers, dots, hyphens, and underscores',
  })
  alias?: string;

  @IsOptional()
  @IsNumber()
  addressId: number;

  @IsOptional()
  @IsNumber()
  invoiceTypeId: number;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
