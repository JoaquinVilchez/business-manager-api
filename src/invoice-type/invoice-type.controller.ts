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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
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
    description: 'Invoice type has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({
    status: 409,
    description: 'An invoice type with this name already exists.',
  })
  create(@Body() createInvoiceTypeDto: CreateInvoiceTypeDto) {
    return this.invoiceTypeService.create(createInvoiceTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoice types with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of invoice types retrieved successfully.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Results per page',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    return this.invoiceTypeService.findAll(page, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Invoice type retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Invoice type not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceTypeService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Update an invoice type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Invoice type updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @ApiResponse({ status: 404, description: 'Invoice type not found.' })
  @ApiResponse({
    status: 409,
    description: 'An invoice type with this name already exists.',
  })
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
    description: 'Invoice type deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Invoice type not found.' })
  @ApiResponse({
    status: 409,
    description:
      'Cannot delete invoice type as it is being used by one or more providers.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceTypeService.remove(id);
  }
}
