import { Module } from '@nestjs/common';
import { InvoiceTypeService } from './invoice-type.service';
import { InvoiceTypeController } from './invoice-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InvoiceTypeController],
  providers: [InvoiceTypeService, PrismaService],
})
export class InvoiceTypeModule {}