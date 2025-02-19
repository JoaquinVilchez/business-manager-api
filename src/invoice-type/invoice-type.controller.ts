import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvoiceTypeService } from './invoice-type.service';
import { CreateInvoiceTypeDto } from './dto/create-invoice-type.dto';
import { UpdateInvoiceTypeDto } from './dto/update-invoice-type.dto';

@ApiTags('invoice-type')
@Controller('invoice-type')
export class InvoiceTypeController {
  constructor(private readonly invoiceTypeService: InvoiceTypeService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create a new invoice type' })
  @ApiResponse({
    status: 201,
    description: 'The invoice type has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createInvoiceTypeDto: CreateInvoiceTypeDto) {
    return this.invoiceTypeService.create(createInvoiceTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoice types' })
  @ApiResponse({ status: 200, description: 'Return all invoice types.' })
  findAll() {
    return this.invoiceTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice type by ID' })
  @ApiResponse({ status: 200, description: 'Return the invoice type.' })
  @ApiResponse({ status: 404, description: 'Invoice type not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceTypeService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Update an invoice type by ID' })
  @ApiResponse({
    status: 200,
    description: 'The invoice type has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Invoice type not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvoiceTypeDto: UpdateInvoiceTypeDto,
  ) {
    return this.invoiceTypeService.update(id, updateInvoiceTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an invoice type by ID' })
  @ApiResponse({
    status: 200,
    description: 'The invoice type has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Invoice type not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceTypeService.remove(id);
  }
}
