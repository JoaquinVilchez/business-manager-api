import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty({
    description: 'Name of the payment method',
    example: 'Transferencia Bancaria',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
