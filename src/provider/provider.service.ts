import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProviderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProviderDto) {
    return await this.prisma.provider.create({
      data: {
        companyName: data.companyName,
        cuit: data.cuit,
        responsable: data.responsable,
        phone: data.phone,
        email: data.email,
        address: data.addressId
          ? { connect: { id: data.addressId } }
          : undefined,
        invoiceType: data.invoiceTypeId
          ? { connect: { id: data.invoiceTypeId } }
          : undefined,
        category: { connect: { id: data.categoryId } },
      },
    });
  }

  async findAll() {
    return this.prisma.provider.findMany({
      include: {
        address: true,
        invoiceType: true,
        category: true,
      },
    });
  }

  async findOne(id: number) {
    const provider = await this.prisma.provider.findUnique({
      where: { id },
      include: {
        address: true,
        invoiceType: true,
        category: true,
      },
    });

    if (!provider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
    return provider;
  }

  async update(id: number, data: UpdateProviderDto) {
    return this.prisma.provider.update({
      where: { id },
      data: {
        companyName: data.companyName,
        cuit: data.cuit,
        responsable: data.responsable,
        phone: data.phone,
        email: data.email,
        ...(data.addressId !== undefined && {
          address: data.addressId
            ? { connect: { id: data.addressId } }
            : undefined,
        }),
        ...(data.invoiceTypeId !== undefined && {
          invoiceType: data.invoiceTypeId
            ? { connect: { id: data.invoiceTypeId } }
            : undefined,
        }),
        ...(data.categoryId !== undefined && {
          category: data.categoryId
            ? { connect: { id: data.categoryId } }
            : undefined,
        }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.provider.delete({ where: { id } });
  }
}
