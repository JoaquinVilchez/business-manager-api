import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
        role: 'ADMIN',
        createdAt: new Date('2024-02-01T10:00:00Z'),
        updatedAt: new Date('2024-02-01T10:00:00Z'),
        deletedAt: null,
      }),
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: '12345678',
          role: 'ADMIN',
          createdAt: new Date('2024-02-01T10:00:00Z'),
          updatedAt: new Date('2024-02-01T10:00:00Z'),
          deletedAt: null,
        },
      ]),
      findUnique: jest.fn().mockResolvedValue({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
        role: 'ADMIN',
        createdAt: new Date('2024-02-01T10:00:00Z'),
        updatedAt: new Date('2024-02-01T10:00:00Z'),
        deletedAt: null,
      }),
      update: jest.fn().mockResolvedValue({
        id: 1,
        firstName: 'John',
        lastName: 'Marley',
        email: 'johnmarley@gmail.com',
        password: '12345678',
        role: 'ADMIN',
        createdAt: new Date('2024-02-01T10:00:00Z'),
        updatedAt: new Date('2024-02-02T10:00:00Z'), // Simulamos actualización
        deletedAt: null,
      }),
      delete: jest.fn().mockResolvedValue({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
        role: 'ADMIN',
        createdAt: new Date('2024-02-01T10:00:00Z'),
        updatedAt: new Date('2024-02-01T10:00:00Z'),
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);

    it('should be defined', () => {
      expect(userService).toBeDefined();
    });

    it('should create a user', async () => {
      const userDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
        role: Role.ADMIN,
      };

      const createdUser = await userService.create(userDto);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: userDto,
      });

      expect(createdUser).toMatchObject({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        role: 'ADMIN',
      });
    });

    it('should find many users', async () => {
      const users = await userService.findAll();

      expect(mockPrismaService.user.findMany).toHaveBeenCalled();

      expect(users).toEqual([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: '12345678',
          role: 'ADMIN',
          createdAt: new Date('2024-02-01T10:00:00Z'),
          updatedAt: new Date('2024-02-01T10:00:00Z'),
          deletedAt: null,
        },
      ]);
    });

    it('should find one user', async () => {
      const user = await userService.findOne(1);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(user).toMatchObject({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
        role: 'ADMIN',
      });
    });

    it('should update a user', async () => {
      const updateUserDto = {
        firstName: 'John',
        lastName: 'Marley',
        email: 'johnmarley@gmail.com',
      };

      const updatedUser = await userService.update(1, updateUserDto);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });

      expect(updatedUser).toMatchObject({
        id: 1,
        firstName: 'John',
        lastName: 'Marley',
        email: 'johnmarley@gmail.com',
        role: 'ADMIN',
        updatedAt: new Date('2024-02-02T10:00:00Z'),
      });
    });

    it('should delete a user permanently', async () => {
      const deletedUser = await userService.delete(1);

      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(deletedUser).toMatchObject({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
        role: 'ADMIN',
      });

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(userService.findOne(1)).rejects.toThrow(
        new NotFoundException(`User with ID 1 not found`),
      );
    });
  });
});
