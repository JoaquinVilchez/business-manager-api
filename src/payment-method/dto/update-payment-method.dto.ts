import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentMethodDto {
  @ApiProperty({
    description: 'Name of the payment method',
    example: 'Transferencia Bancaria Directa',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
