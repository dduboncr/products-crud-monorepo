import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';

import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';

@Injectable()
export class ProductsRouter {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trpc: TrpcService,
  ) {}

  productsRouter = this.trpc.router({
    deleteProduct: this.trpc.procedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return this.prisma.product.delete({
          where: {
            id: input,
          },
        });
      }),
    addProduct: this.trpc.procedure
      .input(
        z.object({
          name: z.string(),
          images: z.string(),
          location: z.string(),
          type: z.string(),
          price: z.string(),
          quantity: z.number(),
        }),
      )
      .mutation(async ({ input }) => {
        return this.prisma.product.create({
          data: {
            name: input.name,
            images: input.images,
            location: input.location,
            type: input.type,
            price: input.price,
            quantity: input.quantity,
          },
        });
      }),
    getProducts: this.trpc.procedure.query(() => {
      return this.prisma.product.findMany();
    }),

    updateProduct: this.trpc.procedure
      .input(
        z.object({
          id: z.number(),
          name: z.string(),
          images: z.string(),
          location: z.string(),
          type: z.string(),
          price: z.string(),
          quantity: z.number(),
        }),
      )
      .mutation(async ({ input }) => {
        return this.prisma.product.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            images: input.images,
            location: input.location,
            type: input.type,
            price: input.price,
            quantity: input.quantity,
          },
        });
      }),
  });
}
