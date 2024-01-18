import { trpc } from './trpc';
import type { Product } from '@prisma/client';
export const getProducts = async () => {
	const products = await trpc.products.getProducts.query();

	return products;
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
	try {
		const result = await trpc.products.addProduct.mutate(product);

		return result;
	} catch (e) {
		console.log(e);
	}
};

export const updateProduct = async (product: Product) => {
	try {
		const result = await trpc.products.updateProduct.mutate(product);

		return result;
	} catch (e) {
		console.log(e);
	}
};

export const deleteProduct = async (id: number) => {
	try {
		const result = await trpc.products.deleteProduct.mutate(id);

		return result;
	} catch (e) {
		console.log(e);
	}
};
