import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService, // Inyectamos el ConfigService
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const roundsOfHashing = this.configService.get<number>(
      'roundsOfHashing',
      10,
    );

    if (!Number.isInteger(roundsOfHashing) || roundsOfHashing <= 0) {
      throw new Error('Invalid roundsOfHashing value in configuration');
    }

    return bcrypt.hash(password, roundsOfHashing);
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await this.hashPassword(data.password),
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const updateData = { ...data };

    if (data.password) {
      updateData.password = await this.hashPassword(data.password);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
