import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    // Check if category with same code already exists
    const existingCategory = await this.prisma.category.findUnique({
      where: { code: data.code },
    });
    if (existingCategory) {
      throw new ConflictException(
        `Category with code ${data.code} already exists`,
      );
    }

    return this.prisma.category.create({
      data,
      select: {
        id: true,
        code: true,
        name: true,
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
            { code: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        where,
        select: {
          id: true,
          code: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          code: 'asc',
        },
        skip,
        take: limit,
      }),
      this.prisma.category.count({ where }),
    ]);

    return {
      data: categories,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    // Check if category exists
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check if new code is already in use
    if (data.code && data.code !== existingCategory.code) {
      const categoryWithSameCode = await this.prisma.category.findUnique({
        where: { code: data.code },
      });
      if (categoryWithSameCode) {
        throw new ConflictException(
          `Category with code ${data.code} already exists`,
        );
      }
    }

    return this.prisma.category.update({
      where: { id },
      data,
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: number) {
    // Check if category exists
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check if category is being used by any provider
    const providerCount = await this.prisma.provider.count({
      where: { categoryId: id },
    });

    if (providerCount > 0) {
      throw new ConflictException(
        'Cannot delete category as it is being used by one or more providers',
      );
    }

    return this.prisma.category.delete({
      where: { id },
      select: {
        id: true,
        code: true,
        name: true,
      },
    });
  }
}
