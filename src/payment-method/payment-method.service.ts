import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePaymentMethodDto) {
    const existingPaymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { name: data.name },
    });
    if (existingPaymentMethod) {
      throw new ConflictException(
        `Payment method with name ${data.name} already exists`,
      );
    }

    return this.prisma.paymentMethod.create({
      data,
    });
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [paymentMethods, total] = await Promise.all([
      this.prisma.paymentMethod.findMany({
        where,
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          id: 'asc',
        },
        skip,
        take: limit,
      }),
      this.prisma.paymentMethod.count({ where }),
    ]);

    return {
      data: paymentMethods,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    return paymentMethod;
  }

  async update(id: number, data: UpdatePaymentMethodDto) {
    console.log(data, id);
    const existingPaymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id },
    });
    if (!existingPaymentMethod) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    if (data.name && data.name !== existingPaymentMethod.name) {
      const paymentMethodWithSameName =
        await this.prisma.paymentMethod.findUnique({
          where: { name: data.name },
        });
      if (paymentMethodWithSameName) {
        throw new ConflictException(
          `Payment method with name ${data.name} already exists`,
        );
      }
    }

    return this.prisma.paymentMethod.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async remove(id: number) {
    const existingPaymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id },
    });
    if (!existingPaymentMethod) {
      throw new NotFoundException(`Payment method with ID ${id} not found`);
    }

    const providerCount = await this.prisma.providerPaymentMethod.count({
      where: { paymentMethodId: id },
    });

    if (providerCount > 0) {
      throw new ConflictException(
        'Cannot delete payment method as it is being used by one or more providers',
      );
    }

    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
