import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('payment-method')
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment method' })
  @ApiResponse({
    status: 201,
    description: 'The payment method has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'Payment method name already exists.',
  })
  create(@Body() data: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payment methods' })
  @ApiResponse({
    status: 200,
    description: 'Return all payment methods with pagination.',
  })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.paymentMethodService.findAll(page, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment method by id' })
  @ApiParam({ name: 'id', description: 'Payment method ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the payment method.',
  })
  @ApiResponse({ status: 404, description: 'Payment method not found.' })
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment method' })
  @ApiParam({ name: 'id', description: 'Payment method ID' })
  @ApiResponse({
    status: 200,
    description: 'The payment method has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Payment method not found.' })
  @ApiResponse({
    status: 409,
    description: 'Payment method name already exists.',
  })
  update(@Param('id') id: string, @Body() data: UpdatePaymentMethodDto) {
    return this.paymentMethodService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment method' })
  @ApiParam({ name: 'id', description: 'Payment method ID' })
  @ApiResponse({
    status: 200,
    description: 'The payment method has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Payment method not found.' })
  @ApiResponse({
    status: 409,
    description:
      'Cannot delete payment method as it is being used by providers.',
  })
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(+id);
  }
}
