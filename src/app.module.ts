import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { InvoiceTypeModule } from './invoice-type/invoice-type.module';
import { AddressModule } from './address/address.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CategoryModule,
    InvoiceTypeModule,
    AddressModule,
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
