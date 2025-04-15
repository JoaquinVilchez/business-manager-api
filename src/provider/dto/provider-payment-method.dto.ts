import { IsNumber, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProviderPaymentMethodDto {
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
}
