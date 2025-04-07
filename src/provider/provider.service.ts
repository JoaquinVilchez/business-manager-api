import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProviderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProviderDto) {
    // Check if provider with same CUIT already exists
    if (data.cuit) {
      const existingProvider = await this.prisma.provider.findUnique({
        where: { cuit: data.cuit },
      });
      if (existingProvider) {
        throw new ConflictException(
          `Provider with CUIT ${data.cuit} already exists`,
        );
      }
    }

    // Check if category exists
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${data.categoryId} not found`,
      );
    }

    // Check if address exists if provided
    if (data.addressId) {
      const address = await this.prisma.address.findUnique({
        where: { id: data.addressId },
      });
      if (!address) {
        throw new NotFoundException(
          `Address with ID ${data.addressId} not found`,
        );
      }
    }

    // Check if invoice type exists if provided
    if (data.invoiceTypeId) {
      const invoiceType = await this.prisma.invoiceType.findUnique({
        where: { id: data.invoiceTypeId },
      });
      if (!invoiceType) {
        throw new NotFoundException(
          `Invoice type with ID ${data.invoiceTypeId} not found`,
        );
      }
    }

    return this.prisma.provider.create({
      data: {
        companyName: data.companyName,
        cuit: data.cuit,
        responsable: data.responsable,
        phone: data.phone,
        email: data.email,
        cbu: data.cbu,
        alias: data.alias,
        comment: data.comment,
        address: data.addressId
          ? { connect: { id: data.addressId } }
          : undefined,
        invoiceType: data.invoiceTypeId
          ? { connect: { id: data.invoiceTypeId } }
          : undefined,
        category: { connect: { id: data.categoryId } },
      },
      select: {
        id: true,
        companyName: true,
        cuit: true,
        responsable: true,
        phone: true,
        email: true,
        cbu: true,
        alias: true,
        comment: true,
        address: {
          select: {
            id: true,
            street: true,
            number: true,
            city: true,
            state: true,
          },
        },
        invoiceType: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { companyName: { contains: search } },
            { cuit: { contains: search } },
            { responsable: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {};

    const [providers, total] = await Promise.all([
      this.prisma.provider.findMany({
        skip,
        take: limit,
        where,
        select: {
          id: true,
          companyName: true,
          cuit: true,
          responsable: true,
          phone: true,
          email: true,
          address: {
            select: {
              id: true,
              street: true,
              city: true,
              state: true,
            },
          },
          invoiceType: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          companyName: 'asc',
        },
      }),
      this.prisma.provider.count({ where }),
    ]);

    return {
      data: providers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const provider = await this.prisma.provider.findUnique({
      where: { id },
      select: {
        id: true,
        companyName: true,
        cuit: true,
        responsable: true,
        phone: true,
        email: true,
        cbu: true,
        alias: true,
        comment: true,
        address: {
          select: {
            id: true,
            street: true,
            number: true,
            city: true,
            state: true,
            zipCode: true,
          },
        },
        invoiceType: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!provider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }

    return provider;
  }

  async update(id: number, data: UpdateProviderDto) {
    // Check if provider exists
    const existingProvider = await this.prisma.provider.findUnique({
      where: { id },
    });
    if (!existingProvider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }

    // Check if new CUIT is already in use
    if (data.cuit && data.cuit !== existingProvider.cuit) {
      const providerWithSameCuit = await this.prisma.provider.findUnique({
        where: { cuit: data.cuit },
      });
      if (providerWithSameCuit) {
        throw new ConflictException(
          `Provider with CUIT ${data.cuit} already exists`,
        );
      }
    }

    // Check if category exists if being updated
    if (data.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${data.categoryId} not found`,
        );
      }
    }

    // Check if address exists if being updated
    if (data.addressId !== undefined) {
      if (data.addressId) {
        const address = await this.prisma.address.findUnique({
          where: { id: data.addressId },
        });
        if (!address) {
          throw new NotFoundException(
            `Address with ID ${data.addressId} not found`,
          );
        }
      }
    }

    // Check if invoice type exists if being updated
    if (data.invoiceTypeId !== undefined) {
      if (data.invoiceTypeId) {
        const invoiceType = await this.prisma.invoiceType.findUnique({
          where: { id: data.invoiceTypeId },
        });
        if (!invoiceType) {
          throw new NotFoundException(
            `Invoice type with ID ${data.invoiceTypeId} not found`,
          );
        }
      }
    }

    return this.prisma.provider.update({
      where: { id },
      data: {
        companyName: data.companyName,
        cuit: data.cuit,
        responsable: data.responsable,
        phone: data.phone,
        email: data.email,
        cbu: data.cbu,
        alias: data.alias,
        comment: data.comment,
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
      select: {
        id: true,
        companyName: true,
        cuit: true,
        responsable: true,
        phone: true,
        email: true,
        cbu: true,
        alias: true,
        comment: true,
        address: {
          select: {
            id: true,
            street: true,
            number: true,
            city: true,
            state: true,
          },
        },
        invoiceType: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: number) {
    // Check if provider exists
    const existingProvider = await this.prisma.provider.findUnique({
      where: { id },
    });
    if (!existingProvider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }

    // Check if provider has any transactions
    const transactionCount = await this.prisma.transaction.count({
      where: { providerId: id },
    });
    if (transactionCount > 0) {
      throw new ConflictException(
        'Cannot delete provider as it has associated transactions',
      );
    }

    return this.prisma.provider.delete({
      where: { id },
      select: {
        id: true,
        companyName: true,
        cuit: true,
      },
    });
  }
}
