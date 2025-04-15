import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  private readonly providerInclude = {
    id: true,
    companyName: true,
    cuit: true,
  };
  private readonly userInclude = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTransactionDto) {
    // Validar que el proveedor existe
    const provider = await this.prisma.provider.findUnique({
      where: { id: data.providerId },
    });
    if (!provider) {
      throw new NotFoundException(
        `Provider with ID ${data.providerId} not found`,
      );
    }

    // Validar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    // Validar que el usuario existe
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id: data.paymentMethodId },
    });
    if (!paymentMethod) {
      throw new NotFoundException(
        `Payment method with ID ${data.paymentMethodId} not found`,
      );
    }

    // Validar que el monto pagado no sea mayor al monto total
    if (data.paidAmount && data.amount && data.paidAmount > data.amount) {
      throw new BadRequestException(
        'Paid amount cannot be greater than total amount',
      );
    }

    return this.prisma.transaction.create({
      data: {
        date: data.date,
        dueDate: data.dueDate,
        receiptNumber: data.receiptNumber,
        type: data.type,
        amount: data.amount,
        paidAmount: data.paidAmount,
        status: data.status,
        matchesInvoice: data.matchesInvoice,
        comment: data.comment,
        provider: { connect: { id: data.providerId } },
        user: { connect: { id: data.userId } },
        paymentMethod: { connect: { id: data.paymentMethodId } },
      },
    });
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { receiptNumber: { contains: search } },
            { provider: { companyName: { contains: search } } },
          ],
        }
      : {};

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        skip,
        take: limit,
        where,
        include: {
          provider: { select: this.providerInclude },
          user: { select: this.userInclude },
        },
        orderBy: {
          date: 'desc',
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      data: transactions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        provider: { select: this.providerInclude },
        user: { select: this.userInclude },
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async update(id: number, data: UpdateTransactionDto) {
    const existingTransaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    if (data.providerId !== undefined) {
      const provider = await this.prisma.provider.findUnique({
        where: { id: data.providerId },
      });
      if (!provider) {
        throw new NotFoundException(
          `Provider with ID ${data.providerId} not found`,
        );
      }
    }

    if (data.userId !== undefined) {
      const user = await this.prisma.user.findUnique({
        where: { id: data.userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${data.userId} not found`);
      }
    }

    return this.prisma.transaction.update({
      where: { id },
      data: {
        date: data.date,
        dueDate: data.dueDate,
        receiptNumber: data.receiptNumber,
        type: data.type,
        amount: data.amount,
        paidAmount: data.paidAmount,
        status: data.status,
        matchesInvoice: data.matchesInvoice,
        comment: data.comment,
        ...(data.providerId !== undefined && {
          provider: { connect: { id: data.providerId } },
        }),
        ...(data.userId !== undefined && {
          user: { connect: { id: data.userId } },
        }),
      },
    });
  }

  async remove(id: number) {
    const existingTransaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
