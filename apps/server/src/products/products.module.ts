import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { ProductsRouter } from './products.router';
import { PrismaService } from '@server/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, TrpcService, ProductsRouter],
})
export class ProductsModule {}
