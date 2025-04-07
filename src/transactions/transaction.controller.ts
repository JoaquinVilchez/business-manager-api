import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Provider or user not found' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    return this.transactionService.findAll(page, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by id' })
  @ApiResponse({
    status: 200,
    description: 'Transaction retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiResponse({ status: 200, description: 'Transaction updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.remove(id);
  }
}
