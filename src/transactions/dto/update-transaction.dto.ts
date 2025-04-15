import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsOptional, ValidateIf, IsEnum } from 'class-validator';
import { TransactionStatus } from 'src/enums/transaction-status.enum';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty({
    description: 'Fecha de la transacción',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.date !== undefined)
  date?: Date;

  @ApiProperty({
    description: 'Monto total de la transacción',
    required: false,
    minimum: 0.01,
    maximum: 999999999.99,
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.amount !== undefined)
  amount?: number;

  @ApiProperty({
    description: 'Monto pagado de la transacción',
    required: false,
    minimum: 0.01,
    maximum: 999999999.99,
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.paidAmount !== undefined)
  paidAmount?: number;

  @ApiProperty({
    description: 'Estado de la transacción',
    required: false,
    example: TransactionStatus.PENDING,
    enum: Object.values(TransactionStatus),
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.status !== undefined)
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @ApiProperty({
    description: 'Indica si la transacción coincide con una factura',
    required: false,
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.matchesInvoice !== undefined)
  matchesInvoice?: boolean;

  @ApiProperty({
    description: 'Comentarios o notas adicionales sobre la transacción',
    required: false,
    example: 'Pago realizado con tarjeta de crédito',
    maxLength: 500,
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.comment !== undefined)
  comment?: string;

  @ApiProperty({
    description: 'ID del proveedor asociado a la transacción',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.providerId !== undefined)
  providerId?: number;

  @ApiProperty({
    description: 'ID del usuario',
    required: false,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.userId !== undefined)
  userId?: number;

  @ApiProperty({
    description: 'ID del método de pago',
    required: false,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @ValidateIf((o: UpdateTransactionDto) => o.paymentMethodId !== undefined)
  paymentMethodId?: number;
}
