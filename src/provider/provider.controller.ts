import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@ApiTags('provider')
@Controller('provider')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new provider' })
  @ApiResponse({
    status: 201,
    description: 'Provider created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 404,
    description: 'Category, address or invoice type not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Provider with the same CUIT already exists',
  })
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all providers with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term for filtering providers',
  })
  @ApiResponse({
    status: 200,
    description: 'List of providers retrieved successfully',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    return this.providerService.findAll(page, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a provider by ID' })
  @ApiResponse({
    status: 200,
    description: 'Provider retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Provider not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a provider by ID' })
  @ApiResponse({
    status: 200,
    description: 'Provider updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 404,
    description: 'Provider, category, address or invoice type not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Provider with the same CUIT already exists',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providerService.update(id, updateProviderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a provider by ID' })
  @ApiResponse({
    status: 200,
    description: 'Provider deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Provider not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Cannot delete provider as it has associated transactions',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.remove(id);
  }
}
