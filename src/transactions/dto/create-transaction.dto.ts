import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
  IsPositive,
  IsEnum,
  Max,
  Min,
  ValidateIf,
  MaxLength,
} from 'class-validator';
import {
  TransactionStatus,
  TransactionType,
} from 'src/enums/transaction-status.enum';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Fecha de la transacción',
    required: true,
    example: '2024-03-20T10:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Fecha de vencimiento de la transacción',
    required: false,
    example: '2024-04-20T10:00:00Z',
    type: Date,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ValidateIf((o: CreateTransactionDto) => o.dueDate !== undefined)
  dueDate?: Date;

  @ApiProperty({
    description: 'Número de recibo o factura',
    required: false,
    example: 'FAC-001-2024',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  receiptNumber?: string;

  @ApiProperty({
    description: 'Tipo de transacción',
    required: true,
    example: TransactionType.INCOME,
    enum: Object.values(TransactionType),
  })
  @IsString()
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    description: 'Monto total de la transacción',
    required: true,
    example: 1500.5,
    minimum: 0.01,
    maximum: 999999999.99,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  @Max(999999999.99)
  amount: number;

  @ApiProperty({
    description: 'Monto pagado de la transacción',
    required: false,
    example: 1000.0,
    minimum: 0.01,
    maximum: 999999999.99,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0.01)
  @Max(999999999.99)
  @ValidateIf((o: CreateTransactionDto) => o.paidAmount !== undefined)
  paidAmount?: number;

  @ApiProperty({
    description: 'Estado de la transacción',
    required: true,
    example: TransactionStatus.PENDING,
    enum: Object.values(TransactionStatus),
  })
  @IsString()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @ApiProperty({
    description: 'Indica si la transacción coincide con una factura',
    required: true,
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  matchesInvoice: boolean;

  @ApiProperty({
    description: 'Comentarios o notas adicionales sobre la transacción',
    required: false,
    example: 'Pago realizado con tarjeta de crédito',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;

  @ApiProperty({
    description: 'ID del proveedor asociado a la transacción',
    required: true,
    example: 1,
    minimum: 1,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  providerId: number;

  @ApiProperty({
    description: 'ID del usuario que realizó la transacción',
    required: true,
    example: 1,
    minimum: 1,
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  userId: number;
}
