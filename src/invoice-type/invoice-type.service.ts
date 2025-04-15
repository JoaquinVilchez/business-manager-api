import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateInvoiceTypeDto } from './dto/create-invoice-type.dto';
import { UpdateInvoiceTypeDto } from './dto/update-invoice-type.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInvoiceTypeDto) {
    // Check if invoice type with the same name already exists
    const existingInvoiceType = await this.prisma.invoiceType.findFirst({
      where: { name: data.name },
    });

    if (existingInvoiceType) {
      throw new ConflictException(
        'An invoice type with this name already exists',
      );
    }

    return this.prisma.invoiceType.create({
      data,
    });
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          name: { contains: search },
        }
      : {};

    const [invoiceTypes, total] = await Promise.all([
      this.prisma.invoiceType.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
          name: 'asc',
        },
      }),
      this.prisma.invoiceType.count({ where }),
    ]);

    return {
      data: invoiceTypes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const invoiceType = await this.prisma.invoiceType.findUnique({
      where: { id },
    });

    if (!invoiceType) {
      throw new NotFoundException(`Invoice type with ID ${id} not found`);
    }

    return invoiceType;
  }

  async update(id: number, data: UpdateInvoiceTypeDto) {
    // Check if invoice type exists
    const existingInvoiceType = await this.prisma.invoiceType.findUnique({
      where: { id },
    });

    if (!existingInvoiceType) {
      throw new NotFoundException(`Invoice type with ID ${id} not found`);
    }

    // If updating name, check if it's already in use
    if (data.name && data.name !== existingInvoiceType.name) {
      const nameExists = await this.prisma.invoiceType.findFirst({
        where: { name: data.name },
      });

      if (nameExists) {
        throw new ConflictException(
          'An invoice type with this name already exists',
        );
      }
    }

    return this.prisma.invoiceType.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    // Check if invoice type exists
    const existingInvoiceType = await this.prisma.invoiceType.findUnique({
      where: { id },
    });

    if (!existingInvoiceType) {
      throw new NotFoundException(`Invoice type with ID ${id} not found`);
    }

    // Check if invoice type is being used by any provider
    const providerCount = await this.prisma.provider.count({
      where: { invoiceTypeId: id },
    });

    if (providerCount > 0) {
      throw new ConflictException(
        'Cannot delete invoice type as it is being used by one or more providers',
      );
    }

    return this.prisma.invoiceType.delete({
      where: { id },
    });
  }
}
