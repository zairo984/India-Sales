"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { AdminCard } from "@/components/CardCompoAdmin";
import { Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Products {
	id: string;
	name: string;
	category: string;
	subCategory: string;
	description: string;
	price: number;
	quantity: number;
	imageUrl: string;
}

const Product = () => {
	const { categories, subCategories } = useParams();
	const category = decodeURIComponent(categories as string);
	const subCategory = decodeURIComponent(subCategories as string);
	const [products, setProducts] = useState<Products[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProducts = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const res = await axios.get(`/api/subcategory/`);

			if (!res.data.products) {
				setProducts([]);
				return;
			}

			const filteredData = res.data.products.filter(
				(item: Products) =>
					item?.subCategory?.toLowerCase() === subCategory.toLowerCase()
			);

			setProducts(filteredData);
		} catch (err) {
			console.error("Error fetching products:", err);
			setError("Failed to load products. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}, [subCategory]);

	useEffect(() => {
		if (subCategory) {
			fetchProducts();
		}
	}, [subCategory, fetchProducts]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
					<p className="text-gray-600">Loading {subCategory} products...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-red-500 mb-4">{error}</p>
					<Button onClick={fetchProducts} className="bg-yellow-500 hover:bg-yellow-600">
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
				<div className="container mx-auto px-4">
					<nav className="text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
						<ol className="flex items-center gap-2 flex-wrap">
							<li>
								<Link href="/" className="hover:text-white">Home</Link>
							</li>
							<li>/</li>
							<li>
								<Link href="/products" className="hover:text-white">Products</Link>
							</li>
							<li>/</li>
							<li>
								<Link href={`/products/${category}`} className="hover:text-white capitalize">
									{category}
								</Link>
							</li>
							<li>/</li>
							<li className="text-yellow-400 capitalize">{subCategory}</li>
						</ol>
					</nav>
					<h1 className="text-4xl font-bold capitalize">{subCategory}</h1>
					<p className="text-gray-300 mt-2">
						{products.length} product{products.length !== 1 ? "s" : ""} available
					</p>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-12">
				{products.length === 0 ? (
					<div className="text-center py-12">
						<Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
						<p className="text-gray-500 text-lg">No products found in {subCategory}.</p>
						<Button asChild className="mt-4 bg-yellow-500 hover:bg-yellow-600">
							<Link href={`/products/${category}`}>Browse {category}</Link>
						</Button>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{products.map((item) => (
							<AdminCard
								key={item.id}
								title={item.name}
								description={item.description}
								imageUrl={item.imageUrl}
								id={item.id}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Product;
