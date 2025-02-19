import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAddressDto) {
    return this.prisma.address.create({ data });
  }

  async findAll() {
    return this.prisma.address.findMany();
  }

  async findOne(id: number) {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async update(id: number, data: UpdateAddressDto) {
    return this.prisma.address.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.address.delete({ where: { id } });
  }
}
