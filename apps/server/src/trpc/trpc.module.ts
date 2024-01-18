import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { ProductsRouter } from '@server/products/products.router';
import { PrismaService } from '@server/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, TrpcService, TrpcRouter, ProductsRouter],
})
export class TrpcModule {}
