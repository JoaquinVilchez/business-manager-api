import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceTypeDto } from './dto/create-invoice-type.dto';
import { UpdateInvoiceTypeDto } from './dto/update-invoice-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoiceTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInvoiceTypeDto) {
    return this.prisma.invoiceType.create({ data });
  }

  async findAll() {
    return this.prisma.invoiceType.findMany();
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
    return this.prisma.invoiceType.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.invoiceType.delete({ where: { id } });
  }
}
