import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAddressDto) {
    return this.prisma.address.create({
      data,
      select: {
        id: true,
        street: true,
        number: true,
        apartmentOrFloor: true,
        city: true,
        state: true,
        zipCode: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            {
              street: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
            { city: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { state: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              zipCode: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
          ],
        }
      : {};

    const [addresses, total] = await Promise.all([
      this.prisma.address.findMany({
        where,
        select: {
          id: true,
          street: true,
          number: true,
          apartmentOrFloor: true,
          city: true,
          state: true,
          zipCode: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          street: 'asc',
        },
        skip,
        take: limit,
      }),
      this.prisma.address.count({ where }),
    ]);

    return {
      data: addresses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const address = await this.prisma.address.findUnique({
      where: { id },
      select: {
        id: true,
        street: true,
        number: true,
        apartmentOrFloor: true,
        city: true,
        state: true,
        zipCode: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return address;
  }

  async update(id: number, data: UpdateAddressDto) {
    // Check if address exists
    const existingAddress = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!existingAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return this.prisma.address.update({
      where: { id },
      data,
      select: {
        id: true,
        street: true,
        number: true,
        apartmentOrFloor: true,
        city: true,
        state: true,
        zipCode: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: number) {
    // Check if address exists
    const existingAddress = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!existingAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    // Check if address is being used by any provider
    const providerCount = await this.prisma.provider.count({
      where: { addressId: id },
    });

    if (providerCount > 0) {
      throw new ConflictException(
        'Cannot delete address as it is being used by one or more providers',
      );
    }

    return this.prisma.address.delete({
      where: { id },
      select: {
        id: true,
        street: true,
        number: true,
        city: true,
        state: true,
      },
    });
  }
}
