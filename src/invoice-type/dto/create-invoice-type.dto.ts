import { IsString } from 'class-validator';

export class CreateInvoiceTypeDto {
  @IsString()
  name: string;
}
