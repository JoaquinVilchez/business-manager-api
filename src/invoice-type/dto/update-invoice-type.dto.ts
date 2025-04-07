import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceTypeDto } from './create-invoice-type.dto';
import {
  IsOptional,
  ValidateIf,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvoiceTypeDto extends PartialType(CreateInvoiceTypeDto) {
  @ApiProperty({
    description: 'Name of the invoice type',
    required: false,
    example: 'Factura B',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  @ValidateIf((o: UpdateInvoiceTypeDto) => o.name !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;
}
