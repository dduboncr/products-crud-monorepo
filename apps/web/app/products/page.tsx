'use client';

import React, { useEffect, useState } from 'react';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../api';
import type { Product } from '@prisma/client';

const ProductManager: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [formData, setFormData] = useState<Product>({
		id: 0,
		name: '',
		images: '',
		price: '',
		type: '',
		location: '',
		quantity: 0,
	});

	const [editIndex, setEditIndex] = useState<number | null>(null);

	useEffect(() => {
		getProducts().then((res) => {
			setProducts(res);
		});
	}, [products]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleAddProduct = () => {
		if (editIndex !== null) {
			updateProduct(formData).then((res) => {
				setProducts((prevProducts) => {
					if (res) {
						const updatedProducts = [...prevProducts];
						updatedProducts[editIndex] = res;
						setEditIndex(null);
						return updatedProducts;
					} else {
						setEditIndex(null);
						return prevProducts;
					}
				});
			});
		} else {
			addProduct(formData).then((res) => {
				if (!res) return;

				setProducts((prevProducts) => [...prevProducts, res]);
			});
		}

		setFormData({
			id: 0,
			name: '',
			images: '',
			price: '',
			type: '',
			location: '',
			quantity: 0,
		});
	};

	const handleEditProduct = (index: number) => {
		setFormData(products[index]);
		setEditIndex(index);
	};

	const handleDeleteProduct = (index: number) => {
		deleteProduct(products[index].id).then((res) => {
			if (!res) return;

			setProducts((prevProducts) => {
				const updatedProducts = [...prevProducts];
				updatedProducts.splice(index, 1);
				return updatedProducts;
			});
		});

		// Clear form data if deleting the currently edited product
		if (index === editIndex) {
			setFormData({
				id: 0,
				name: '',
				images: '',
				price: '',
				type: '',
				location: '',
				quantity: 0,
			});
			setEditIndex(null);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-semibold mb-4">Product Manager</h1>
			<form className="grid grid-cols-2 gap-4 mb-4">
				<div>
					<label className="block mb-2">
						Name:
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							className="border p-2 w-full"
						/>
					</label>
					<label className="block mb-2">
						Images:
						<input
							type="text"
							name="images"
							value={formData.images}
							onChange={handleInputChange}
							className="border p-2 w-full"
						/>
					</label>
					<label className="block mb-2">
						Price:
						<input
							type="text"
							name="price"
							value={formData.price}
							onChange={handleInputChange}
							className="border p-2 w-full"
						/>
					</label>
				</div>
				<div>
					<label className="block mb-2">
						Type:
						<input
							type="text"
							name="type"
							value={formData.type}
							onChange={handleInputChange}
							className="border p-2 w-full"
						/>
					</label>
					<label className="block mb-2">
						Location:
						<input
							type="text"
							name="location"
							value={formData.location}
							onChange={handleInputChange}
							className="border p-2 w-full"
						/>
					</label>
					<label className="block mb-2">
						Quantity:
						<input
							type="text"
							name="quantity"
							value={formData.quantity}
							onChange={handleInputChange}
							className="border p-2 w-full"
						/>
					</label>
				</div>
				<button
					type="button"
					onClick={handleAddProduct}
					className={`${editIndex !== null ? 'bg-yellow-500' : 'bg-blue-500'} hover:${
						editIndex !== null ? 'bg-yellow-700' : 'bg-blue-700'
					} text-white font-bold py-2 px-4 rounded col-span-2`}
				>
					{editIndex !== null ? 'Update Product' : 'Add Product'}
				</button>
			</form>
			<h2 className="text-2xl font-semibold mb-2">Product List</h2>
			<ul>
				{products.map((product, index) => (
					<li key={index} className="bg-gray-100 p-4 mb-4 border rounded">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-lg font-semibold">{product.name}</p>
								<p>
									<strong>Price:</strong> {product.price}
								</p>
								<p>
									<strong>Location:</strong> {product.location}
								</p>
								<p>
									<strong>Quantity:</strong> {product.quantity}
								</p>
							</div>
							<div className="flex space-x-2">
								<button
									type="button"
									onClick={() => handleEditProduct(index)}
									className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
								>
									Edit
								</button>
								<button
									type="button"
									onClick={() => handleDeleteProduct(index)}
									className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
								>
									Delete
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductManager;
